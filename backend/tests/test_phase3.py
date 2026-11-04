import os
import sys
import time
import codecs

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from app.main import app


def run_tests():
    print("==================================================")
    print("   DIGITAL THEAB - PHASE 3 VERIFICATION SUITE    ")
    print("==================================================")

    ts = int(time.time())

    with TestClient(app) as client:
        # 1. Public Guest Invitation Fetch & Atomic View Increment
        res1 = client.get("/api/v1/public/invitations/vibol-sovanndy")
        assert res1.status_code == 200, f"Public invitation failed: {res1.text}"
        inv_data = res1.json()
        assert inv_data["slug"] == "vibol-sovanndy"
        initial_views = inv_data["views_count"]

        # Fetch second time to verify view counter increment
        res2 = client.get("/api/v1/public/invitations/vibol-sovanndy")
        assert res2.status_code == 200
        new_views = res2.json()["views_count"]
        assert new_views == initial_views + 1
        print(f"[PASS] 1. Public guest invitation view verified with atomic counter ({initial_views} -> {new_views})")

        # 2. Non-existent slug returns 404
        res_404 = client.get("/api/v1/public/invitations/unknown-slug-xyz")
        assert res_404.status_code == 404
        assert "រកមិនឃើញ" in res_404.json()["detail"]
        print("[PASS] 2. Non-existent slug returns 404 with Khmer user-friendly message")

        # 3. Public Guest RSVP Submission with XSS Sanitization
        xss_wish = "<script>alert('hack')</script>សូមជូនពរឱ្យស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង!"
        rsvp_payload = {
            "guest_name": "លោកបណ្ឌិត ម៉ម សុភ័ក្ត្រ",
            "phone": "012 555 444",
            "attendance_status": "attending",
            "guest_count": 3,
            "wishes": xss_wish,
            "source": "telegram"
        }
        res_rsvp = client.post("/api/v1/public/invitations/vibol-sovanndy/rsvps", json=rsvp_payload)
        assert res_rsvp.status_code == 201, f"Public RSVP failed: {res_rsvp.text}"
        saved_rsvp = res_rsvp.json()
        assert saved_rsvp["guest_name"] == "លោកបណ្ឌិត ម៉ម សុភ័ក្ត្រ"
        assert saved_rsvp["guest_count"] == 3
        # Assert script tag was stripped
        assert "<script>" not in saved_rsvp["wishes"]
        assert "alert" not in saved_rsvp["wishes"]
        assert "សូមជូនពរឱ្យស្រលាញ់គ្នារហូតដល់ចាស់កោងខ្នង!" in saved_rsvp["wishes"]
        print("[PASS] 3. Public RSVP saved successfully and XSS script tags stripped cleanly!")

        # 4. Public Wishes Feed
        res_wishes = client.get("/api/v1/public/invitations/vibol-sovanndy/wishes")
        assert res_wishes.status_code == 200, f"Wishes feed failed: {res_wishes.text}"
        wishes_list = res_wishes.json()
        assert len(wishes_list) >= 1
        assert any("ម៉ម សុភ័ក្ត្រ" in w["guest_name"] for w in wishes_list)
        print(f"[PASS] 4. Public guestbook wishes feed verified: {len(wishes_list)} wishes retrieved")

        # 5. Host Real-time Analytics & Table Estimation
        inv_id = inv_data["id"]
        res_stats = client.get(f"/api/v1/invitations/{inv_id}/stats")
        assert res_stats.status_code == 200, f"Stats failed: {res_stats.text}"
        stats = res_stats.json()
        assert stats["total_responses"] >= 4
        assert stats["total_attending_guests"] >= 8
        assert stats["estimated_tables"] >= 1
        assert stats["recent_wishes_count"] >= 4
        print(f"[PASS] 5. Host stats verified: {stats['total_attending_guests']} confirmed guests, {stats['estimated_tables']} tables needed")

        # 6. Guest List CSV Export with UTF-8 BOM
        res_csv = client.get(f"/api/v1/invitations/{inv_id}/export-guests")
        assert res_csv.status_code == 200, f"CSV export failed: {res_csv.status_code}"
        assert res_csv.headers["content-type"].startswith("text/csv")
        # Check for UTF-8 BOM
        assert res_csv.content.startswith(codecs.BOM_UTF8)
        decoded_csv = res_csv.content.decode("utf-8")
        assert "ឈ្មោះភ្ញៀវកិត្តិយស" in decoded_csv
        assert "ម៉ម សុភ័ក្ត្រ" in decoded_csv
        print("[PASS] 6. Guest list CSV export verified with UTF-8 BOM encoding for Microsoft Excel")

        # 7. Creator Ownership Guard
        # Create Owner A and Invitation A
        user_a_email = f"owner_a_{ts}@theabdigital.com"
        reg_a = client.post("/api/v1/auth/register", json={
            "email": user_a_email,
            "password": "Password123!",
            "full_name": "ម្ចាស់ការ ទី១"
        }).json()
        token_a = reg_a["access_token"]

        inv_a = client.post("/api/v1/invitations", json={
            "slug": f"wedding-a-{ts}",
            "template_id": "royal-gold",
            "groom_name": "កូនកំលោះ A",
            "bride_name": "កូនក្រមុំ A",
            "ceremony_date_kh": "ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧"
        }, headers={"Authorization": f"Bearer {token_a}"}).json()
        inv_a_id = inv_a["id"]

        # Create Owner B
        user_b_email = f"owner_b_{ts}@theabdigital.com"
        reg_b = client.post("/api/v1/auth/register", json={
            "email": user_b_email,
            "password": "Password123!",
            "full_name": "ម្ចាស់ការ ទី២"
        }).json()
        token_b = reg_b["access_token"]

        # Owner B attempts to edit Owner A's invitation -> Expect 403 Forbidden
        hack_res = client.put(
            f"/api/v1/invitations/{inv_a_id}",
            json={"groom_name": "Hacked Name"},
            headers={"Authorization": f"Bearer {token_b}"}
        )
        assert hack_res.status_code == 403, f"Expected 403 but got {hack_res.status_code}"
        print("[PASS] 7. Ownership guard verified: Cross-user mutation blocked with 403 Forbidden")

    print("==================================================")
    print("   ALL 7 TESTS IN PHASE 3 PASSED WITH 100% SUCCESS!")
    print("==================================================")


if __name__ == "__main__":
    run_tests()

