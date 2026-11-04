import os
import sys
import time

backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from app.main import app


def run_tests():
    print("==================================================")
    print("   DIGITAL THEAB - PHASE 1 VERIFICATION SUITE    ")
    print("==================================================")

    ts = int(time.time())
    test_email = f"user_{ts}@theabdigital.com"

    with TestClient(app) as client:
        # 1. Health check
        res = client.get("/health")
        assert res.status_code == 200, f"Health failed: {res.text}"
        print("[PASS] 1. Health check: OK")

        # 2. Register user
        reg_payload = {
            "email": test_email,
            "password": "Password123!",
            "full_name": "ចាន់ សុផល",
            "phone": "012 888 777"
        }
        res = client.post("/api/v1/auth/register", json=reg_payload)
        assert res.status_code == 201, f"Register failed: {res.text}"
        data = res.json()
        assert "access_token" in data
        token = data["access_token"]
        user_id = data["user"]["id"]
        print(f"[PASS] 2. User registration: Token issued for user_id={user_id}")

        # 3. Duplicate email test
        res = client.post("/api/v1/auth/register", json=reg_payload)
        assert res.status_code == 400, f"Duplicate check failed: {res.text}"
        print("[PASS] 3. Duplicate registration rejected with 400 Bad Request")

        # 4. User login
        login_payload = {
            "email": test_email,
            "password": "Password123!"
        }
        res = client.post("/api/v1/auth/login", json=login_payload)
        assert res.status_code == 200, f"Login failed: {res.text}"
        token = res.json()["access_token"]
        print("[PASS] 4. User login: Credentials verified and fresh JWT issued")

        # 5. Access protected /me
        res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert res.status_code == 200, f"Protected /me failed: {res.text}"
        assert res.json()["email"] == test_email
        print("[PASS] 5. Protected route /me verified: Authenticated user returned")

        # 6. Unauthorized access /me
        res = client.get("/api/v1/auth/me")
        assert res.status_code == 401, f"Unauthorized check failed: {res.text}"
        print("[PASS] 6. Unauthenticated request rejected with 401 Unauthorized")

        # 7. Check seeded invitation with all child data
        res = client.get("/api/v1/invitations/slug/vibol-sovanndy")
        assert res.status_code == 200, f"Seeded invitation failed: {res.text}"
        inv = res.json()
        assert inv["slug"] == "vibol-sovanndy"
        assert len(inv["agendas"]) == 5
        assert len(inv["galleries"]) == 4
        assert len(inv["bank_accounts"]) == 1
        assert len(inv["rsvps"]) == 3
        print(f"[PASS] 7. Seeded invitation verified: 5 agendas, 4 gallery photos, 1 bank account, 3 RSVPs")

        # 8. Create new customized invitation with token
        new_inv_payload = {
            "slug": f"rith-chivy-{ts}",
            "template_id": "romdoul-moonlight",
            "event_type": "wedding",
            "title_kh": "សិរីសួស្តី អាពាហ៍ពិពាហ៍",
            "groom_name": "កែវ រិទ្ធ",
            "bride_name": "ម៉ៅ ជីវី",
            "ceremony_date_kh": "ថ្ងៃសៅរ៍ ទី២០ ខែកុម្ភៈ ឆ្នាំ២០២៧",
            "ceremony_time": "ម៉ោង ០៥:០០ ល្ងាច",
            "location_name": "សណ្ឋាគារ ហៃយ៉ាត់ រីជិនស៊ី ភ្នំពេញ",
            "theme_color": "midnight",
            "agendas": [
                {"time_text": "០៧:០០ ព្រឹក", "title_kh": "ពិធីហែជំនូន", "order_index": 1},
                {"time_text": "០៥:០០ ល្ងាច", "title_kh": "ពិសារភោជនាហារ", "order_index": 2}
            ],
            "galleries": [
                {"image_url": "/images/templates/romdoul-moonlight/hero_1.webp", "caption": "Prewedding 1", "order_index": 1}
            ],
            "bank_accounts": [
                {"bank_name": "ABA Bank", "account_name": "KEO RITH", "account_number": "001 222 333", "is_primary": True}
            ]
        }
        res = client.post("/api/v1/invitations", json=new_inv_payload, headers={"Authorization": f"Bearer {token}"})
        assert res.status_code == 201, f"Create invitation failed: {res.text}"
        created = res.json()
        assert created["user_id"] == user_id
        assert len(created["agendas"]) == 2
        assert len(created["galleries"]) == 1
        assert len(created["bank_accounts"]) == 1
        print(f"[PASS] 8. Custom invitation created: Linked to user_id={created['user_id']}, slug='{created['slug']}'")

    print("==================================================")
    print("   ALL 8 TESTS IN PHASE 1 PASSED WITH 100% SUCCESS!")
    print("==================================================")


if __name__ == "__main__":
    run_tests()
