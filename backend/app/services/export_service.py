import io
import csv
import codecs
from typing import List
from app.models.rsvp import GuestRSVP


STATUS_KHMER = {
    "attending": "ចូលរួម (Attending)",
    "declined": "មិនអាចចូលរួម (Declined)",
    "tentative": "មិនទាន់ប្រាកដ (Tentative)",
}


def generate_guests_csv(rsvps: List[GuestRSVP]) -> bytes:
    """
    Generates a CSV string with UTF-8 BOM encoding so Khmer fonts open cleanly in Excel.
    """
    output = io.StringIO()
    writer = csv.writer(output, quoting=csv.QUOTE_MINIMAL)

    # Khmer Headers
    writer.writerow([
        "ល.រ",
        "ឈ្មោះភ្ញៀវកិត្តិយស",
        "លេខទូរស័ព្ទ",
        "ស្ថានភាពចូលរួម",
        "ចំនួនភ្ញៀវ (នាក់)",
        "ពាក្យជូនពរ",
        "ប្រភពនៃការឆ្លើយតប",
        "កាលបរិច្ឆេទ"
    ])

    for i, r in enumerate(rsvps, 1):
        status_kh = STATUS_KHMER.get(r.attendance_status, r.attendance_status)
        created_str = r.created_at.strftime("%Y-%m-%d %H:%M") if r.created_at else ""
        writer.writerow([
            i,
            r.guest_name,
            r.phone or "",
            status_kh,
            r.guest_count,
            r.wishes or "",
            r.source or "direct",
            created_str
        ])

    csv_data = output.getvalue()
    # Prepend UTF-8 BOM
    return codecs.BOM_UTF8 + csv_data.encode("utf-8")
