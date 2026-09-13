"""Rebuild the one-page CV, retaining contact values from the existing public PDF.

Requires reportlab and pypdf. Supply --font-dir if Arial is not in Windows/Fonts.
No phone number is embedded in this source or written to command output.
"""

from argparse import ArgumentParser
from html import escape
from pathlib import Path
import re

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate


ROOT = Path(__file__).resolve().parents[1]
INK = colors.HexColor("#172f35")
MUTED = colors.HexColor("#50676a")
TEAL = colors.HexColor("#067c68")
RULE = colors.HexColor("#c4d5d0")


def build_cv(contact_source: Path, output: Path, font_dir: Path) -> None:
    existing = " ".join(page.extract_text() or "" for page in PdfReader(contact_source).pages)
    phone_match = re.search(r"(?:\+972[- ]?|0)5\d[- ]?\d{3}[- ]?\d{4}", existing)
    email_match = re.search(r"[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}", existing)
    if not phone_match or not email_match:
        raise ValueError("A phone number and email are required in the contact-source PDF.")
    phone, email = phone_match.group(), email_match.group()

    pdfmetrics.registerFont(TTFont("CV", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("CV-Bold", str(font_dir / "arialbd.ttf")))
    pdfmetrics.registerFontFamily("CV", normal="CV", bold="CV-Bold")

    base = ParagraphStyle("body", fontName="CV", fontSize=9.8, leading=13.3, textColor=INK, alignment=TA_LEFT)
    styles = {
        "name": ParagraphStyle("name", parent=base, fontName="CV-Bold", fontSize=27, leading=31, spaceAfter=5),
        "role": ParagraphStyle("role", parent=base, fontSize=10.8, leading=15, textColor=TEAL, spaceAfter=8),
        "contact": ParagraphStyle("contact", parent=base, fontSize=9, leading=12.5, textColor=MUTED),
        "section": ParagraphStyle("section", parent=base, fontName="CV-Bold", fontSize=10, leading=13, textColor=TEAL, spaceBefore=12, spaceAfter=5, keepWithNext=True),
        "entry": ParagraphStyle("entry", parent=base, fontName="CV-Bold", fontSize=10.2, leading=13.8, spaceBefore=6, spaceAfter=2, keepWithNext=True),
        "meta": ParagraphStyle("meta", parent=base, fontSize=9, leading=12, textColor=MUTED, spaceAfter=3, keepWithNext=True),
        "body": base,
        "bullet": ParagraphStyle("bullet", parent=base, leftIndent=9, firstLineIndent=-9, spaceAfter=2),
        "project": ParagraphStyle("project", parent=base, fontName="CV-Bold", fontSize=10, leading=13.5, spaceBefore=6, spaceAfter=2, keepWithNext=True),
        "skills": ParagraphStyle("skills", parent=base, fontSize=9.4, leading=13.2, spaceAfter=2),
    }
    story = []

    def p(text: str, style: str = "body") -> None:
        story.append(Paragraph(text, styles[style]))

    def section(title: str) -> None:
        p(title.upper(), "section")
        story.append(HRFlowable(width="100%", thickness=.5, color=RULE, spaceAfter=5))

    p("Tomer Naydnov", "name")
    p("Software engineer | Product builder", "role")
    p(f'{escape(phone)} &nbsp; | &nbsp; <link href="mailto:{escape(email)}" color="#50676a">{escape(email)}</link> &nbsp; | &nbsp; <link href="https://tomer-naydnov.com" color="#50676a">tomer-naydnov.com</link>', "contact")
    p('<link href="https://www.linkedin.com/in/tomer-naydnov/" color="#50676a">linkedin.com/in/tomer-naydnov</link> &nbsp; | &nbsp; <link href="https://github.com/tnaydnov" color="#50676a">github.com/tnaydnov</link>', "contact")

    section("Profile")
    p("Software engineer who loves creating products, from understanding user needs and shaping ideas to implementation, launch and continued improvement. Currently studying toward an M.Sc. in Industrial Engineering &amp; Management.")

    section("Experience")
    p("EdTech Project Leader &amp; Content Developer | Nitzanim", "entry")
    p("Nitzanim tenure: 2023-present. Earlier responsibilities included programming instruction.", "meta")
    for text in [
        "Clarify client and educational needs, define requirements and deliverables, and align stakeholders.",
        "Develop syllabuses, presentations, lesson plans, instructor guides and programming exercises.",
        "Plan delivery with timelines and Gantt plans, break work into tasks, and coordinate testing and rollout.",
    ]:
        p("&#8226; " + text, "bullet")
    p("Tier 2 Technical Support | IDF, Israel Electric Corporation &amp; Isracard", "entry")
    p("2020-2023", "meta")
    p("Diagnosed user and system issues across Active Directory, Citrix, remote access, hardware, software and connectivity; documented solutions and communicated next steps.")

    section("Education")
    p("M.Sc. Industrial Engineering &amp; Management | 2026-present, expected 2028", "entry")
    p("Shenkar College of Engineering, Design and Art", "body")
    p("B.Sc. Software Engineering | 2021-2025", "entry")
    p("Ben-Gurion University of the Negev", "body")

    section("Selected products & engineering")
    p("With one coworker, I co-develop Arc and Browser Coder. Both are live, continually supported and expanded, serving 3,000+ students, instructors and managers across the combined platform.")
    p('<link href="https://tomer-naydnov.com/work/arc" color="#172f35">Arc Academy</link> | Co-developer | 2026-present', "project")
    p("Build a learning platform connecting curriculum, classroom delivery, student work, feedback and reporting, with continued work on product workflows, architecture, testing and rollout.")
    p('<link href="https://github.com/ninasokolov8/browser-coder" color="#172f35">Browser Coder</link> | Co-developer | Since April 2026', "project")
    p("Build and improve a browser coding environment: classroom embedding, debugging, execution feedback and Python Turtle graphics.")
    p('<link href="https://github.com/tnaydnov/Applytide" color="#172f35">Applytide</link> | Independent full-stack project | Source archived', "project")
    p("Designed and built job-application workflows, document tools, reminders and interview preparation using React, TypeScript, FastAPI, PostgreSQL, Redis, Docker and the OpenAI API.")
    p('<link href="https://github.com/tnaydnov/eventa" color="#172f35">Eventa</link> | Independent product | Discontinued; source public', "project")
    p("Designed, built and operated a mobile web product for event-based social connection: QR entry, profiles, matching and messaging with Next.js, TypeScript and Supabase/PostgreSQL.")

    section("Skills")
    p("<b>Engineering:</b> Python, Java, TypeScript, SQL, REST APIs, Git/GitHub, Docker.", "skills")
    p("<b>Product &amp; delivery:</b> Requirements, user flows, project planning, QA, technical writing.", "skills")
    p("<b>AI tools:</b> LLM-based tools, prompt design, OpenAI API.", "skills")

    output.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=37, leftMargin=37, topMargin=28, bottomMargin=27, title="Tomer Naydnov - CV", author="Tomer Naydnov", pageCompression=1)
    doc.build(story)
    reader = PdfReader(output)
    if len(reader.pages) != 1:
        raise ValueError(f"CV must be one page; generated {len(reader.pages)} pages.")
    extracted = reader.pages[0].extract_text() or ""
    if phone not in extracted or email not in extracted:
        raise ValueError("Contact details were not preserved in the generated PDF.")
    print("Generated one-page CV; original contact values retained.")


if __name__ == "__main__":
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("--contact-source", type=Path, default=ROOT / "public/Tomer Naydnov.pdf")
    parser.add_argument("--output", type=Path, default=ROOT / "public/Tomer Naydnov.pdf")
    parser.add_argument("--font-dir", type=Path, default=Path("C:/Windows/Fonts"))
    args = parser.parse_args()
    build_cv(args.contact_source, args.output, args.font_dir)
