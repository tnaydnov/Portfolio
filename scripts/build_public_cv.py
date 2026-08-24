"""Build the source-grounded, portfolio-safe public CV.

The supplied CV remains the owner-provided source. This derivative deliberately removes
unverified adoption metrics, credits Arc co-development, and links readers to the
portfolio for deeper project evidence.
"""

from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Tomer Naydnov.pdf"

PAGE_W, PAGE_H = A4
PAPER = HexColor("#F3EFE6")
INK = HexColor("#101315")
MUTED = HexColor("#586260")
FAINT = HexColor("#7B8582")
RULE = HexColor("#CAC5BA")
SIGNAL = HexColor("#D94725")
TRACE = HexColor("#547D7E")


def register_fonts() -> tuple[str, str, str]:
    regular = Path(r"C:\Windows\Fonts\arial.ttf")
    bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
    mono = Path(r"C:\Windows\Fonts\consola.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("PortfolioSans", str(regular)))
        pdfmetrics.registerFont(TTFont("PortfolioSans-Bold", str(bold)))
        mono_name = "Courier"
        if mono.exists():
            pdfmetrics.registerFont(TTFont("PortfolioMono", str(mono)))
            mono_name = "PortfolioMono"
        return "PortfolioSans", "PortfolioSans-Bold", mono_name
    return "Helvetica", "Helvetica-Bold", "Courier"


FONT, FONT_BOLD, FONT_MONO = register_fonts()


def style(name: str, size: float, leading: float, color=INK, **kwargs) -> ParagraphStyle:
    return ParagraphStyle(
        name,
        fontName=kwargs.pop("fontName", FONT),
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=0,
        spaceBefore=0,
        allowWidows=0,
        allowOrphans=0,
        **kwargs,
    )


S_SECTION = style("section", 7.8, 9.2, SIGNAL, fontName=FONT_BOLD, tracking=1.2)
S_ROLE = style("role", 10.1, 12.2, INK, fontName=FONT_BOLD)
S_META = style("meta", 8.0, 9.8, TRACE, fontName=FONT_BOLD)
S_BODY = style("body", 8.55, 11.2, INK)
S_SMALL = style("small", 7.2, 9.0, MUTED)
S_SKILL = style("skill", 8.15, 10.45, INK)


def draw_paragraph(c: canvas.Canvas, text: str, paragraph_style: ParagraphStyle, x: float, y: float, width: float) -> float:
    p = Paragraph(text, paragraph_style)
    _, height = p.wrap(width, PAGE_H)
    p.drawOn(c, x, y - height)
    return y - height


def section(c: canvas.Canvas, label: str, x: float, y: float, width: float) -> float:
    c.setStrokeColor(RULE)
    c.setLineWidth(0.55)
    c.line(x, y, x + width, y)
    return draw_paragraph(c, label.upper(), S_SECTION, x, y - 8, width) - 7


def item(
    c: canvas.Canvas,
    title: str,
    meta: str,
    bullets: list[str],
    x: float,
    y: float,
    width: float,
    gap_after: float = 8,
) -> float:
    y = draw_paragraph(c, title, S_ROLE, x, y, width)
    y = draw_paragraph(c, meta, S_META, x, y - 1.5, width) - 3
    for bullet in bullets:
        y = draw_paragraph(c, f"<font color='#D94725'>-</font>&nbsp;&nbsp;{bullet}", S_BODY, x, y, width) - 1.5
    return y - gap_after


def skill_block(c: canvas.Canvas, title: str, text: str, x: float, y: float, width: float) -> float:
    y = draw_paragraph(c, title, S_ROLE, x, y, width)
    return draw_paragraph(c, text, S_SKILL, x, y - 2, width) - 8


def add_link(c: canvas.Canvas, label: str, url: str, x: float, y: float, font_size: float = 7.1) -> float:
    c.setFont(FONT, font_size)
    c.setFillColor(MUTED)
    c.drawString(x, y, label)
    width = pdfmetrics.stringWidth(label, FONT, font_size)
    c.linkURL(url, (x, y - 1.5, x + width, y + font_size + 1.5), relative=0)
    return x + width


def build() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Tomer Naydnov - CV")
    c.setAuthor("Tomer Naydnov")
    c.setSubject("Technical product builder")

    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)
    c.setFillColor(SIGNAL)
    c.rect(0, PAGE_H - 5.5 * mm, PAGE_W, 5.5 * mm, stroke=0, fill=1)

    margin = 15 * mm
    top = PAGE_H - 18 * mm
    c.setFillColor(INK)
    c.setFont(FONT_BOLD, 26)
    c.drawString(margin, top, "Tomer Naydnov")

    c.setFillColor(SIGNAL)
    c.setFont(FONT_BOLD, 11)
    c.drawString(margin, top - 17, "TECHNICAL PRODUCT BUILDER")
    c.setFillColor(MUTED)
    c.setFont(FONT, 8.4)
    c.drawString(margin, top - 31, "Software engineering graduate - M.Sc. student - Product, systems and implementation")

    contact_y = top - 48
    x = margin
    links = [
        ("+972-50-5752650", "tel:+972505752650"),
        ("tnaydnov@gmail.com", "mailto:tnaydnov@gmail.com"),
        ("tomernaydnov.com", "https://tomernaydnov.com"),
        ("GitHub", "https://github.com/tnaydnov"),
        ("LinkedIn", "https://www.linkedin.com/in/tomer-naydnov"),
    ]
    for index, (label, url) in enumerate(links):
        if index:
            c.setFillColor(FAINT)
            c.setFont(FONT, 7.1)
            c.drawString(x, contact_y, "  |  ")
            x += pdfmetrics.stringWidth("  |  ", FONT, 7.1)
        x = add_link(c, label, url, x, contact_y)

    content_top = contact_y - 20
    left_x = margin
    gap = 9 * mm
    right_w = 53 * mm
    left_w = PAGE_W - (2 * margin) - gap - right_w
    right_x = left_x + left_w + gap

    left_y = section(c, "Experience", left_x, content_top, left_w)
    left_y = item(
        c,
        "Programming Instructor & EdTech Content Developer",
        "Nitzanim | 2023 - present",
        [
            "Teach programming and develop syllabuses, presentations, lesson plans, instructor guides and exercises.",
            "Translate stakeholder and classroom needs into requirements, plans, Gantt dependencies, tested changes and delivery support.",
            "Co-develop Arc with another engineer. Repository-visible work includes architecture, portal UX, security, realtime behavior, touch interactions, testing and CI.",
        ],
        left_x,
        left_y,
        left_w,
    )
    left_y = item(
        c,
        "Tier 2 Technical Support",
        "IDF, Israel Electric Corporation and Isracard | 2020 - 2023",
        [
            "Diagnosed user and system issues across Active Directory, Citrix, remote access, hardware, software and connectivity; documented fixes and coordinated with users and technical teams."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=10,
    )

    left_y = section(c, "Selected work", left_x, left_y, left_w)
    left_y = item(
        c,
        "Arc - learning operations platform",
        "Co-developed | 2026 - present | Portal online",
        [
            "Connects reusable educational content, live classroom delivery, student work, instructor feedback and operational insight in one system."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=6,
    )
    left_y = item(
        c,
        "Applytide - job application operations",
        "Solo creator | Aug 2025 - Apr 2026 | Source archived",
        [
            "Structured capture, application pipelines, documents, reminders, analytics and interview preparation across a React/FastAPI/PostgreSQL system."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=6,
    )
    left_y = item(
        c,
        "Eventa - event-scoped social product",
        "Solo creator | 2026 | Discontinued, source public",
        [
            "Implemented mobile QR onboarding, guest profiles, matching, private messaging and organizer workflows with Next.js and Supabase."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=6,
    )
    left_y = item(
        c,
        "License Plate Recognition",
        "Five-person BGU capstone | 2024 - 2025",
        [
            "Focused on motion detection, data gathering, model training and fine-tuning, and failure analysis within a continuous plate-recognition pipeline."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=6,
    )
    left_y = item(
        c,
        "Trading System - multi-store marketplace",
        "Team engineering project | May - Jul 2024 | Source archived",
        [
            "Java marketplace system exploring stores, carts, appointments, permissions and domain/service boundaries."
        ],
        left_x,
        left_y,
        left_w,
        gap_after=0,
    )

    right_y = section(c, "Profile", right_x, content_top, right_w)
    right_y = draw_paragraph(
        c,
        "Technical product builder who moves from an unclear user or operational problem to a working system. I combine software engineering, systems thinking, teaching and hands-on product delivery - from framing and workflow design through implementation, testing and iteration.",
        S_BODY,
        right_x,
        right_y,
        right_w,
    ) - 11

    right_y = section(c, "Education", right_x, right_y, right_w)
    right_y = item(
        c,
        "M.Sc. Industrial Engineering & Management",
        "Shenkar | 2026 - present | Expected 2028",
        [],
        right_x,
        right_y,
        right_w,
        gap_after=7,
    )
    right_y = item(
        c,
        "B.Sc. Software Engineering",
        "Ben-Gurion University | 2021 - 2025",
        [],
        right_x,
        right_y,
        right_w,
        gap_after=10,
    )

    right_y = section(c, "Capabilities", right_x, right_y, right_w)
    right_y = skill_block(
        c,
        "Product & systems",
        "Problem framing, requirements, user flows, workflow design, project planning, QA, field feedback, technical writing",
        right_x,
        right_y,
        right_w,
    )
    right_y = skill_block(
        c,
        "Engineering",
        "TypeScript, React, Python, FastAPI, Java, SQL, PostgreSQL, REST APIs, Git/GitHub, Docker, CI and automated testing",
        right_x,
        right_y,
        right_w,
    )
    right_y = skill_block(
        c,
        "Applied AI",
        "OpenAI API, prompt and workflow design, structured extraction, bounded LLM integrations",
        right_x,
        right_y,
        right_w,
    )

    right_y = section(c, "What I am looking for", right_x, right_y, right_w)
    right_y = draw_paragraph(
        c,
        "A technical product or product-minded engineering role on a small team, close to users and close enough to implementation to own the outcome.",
        S_BODY,
        right_x,
        right_y,
        right_w,
    ) - 10

    right_y = section(c, "Working principle", right_x, right_y, right_w)
    right_y = draw_paragraph(
        c,
        "I find the workaround everyone has accepted, trace it to the real problem, and build the fix.",
        style("quote", 11.2, 14.2, INK, fontName=FONT_BOLD),
        right_x,
        right_y,
        right_w,
    )

    footer_y = 12 * mm
    c.setStrokeColor(RULE)
    c.setLineWidth(0.55)
    c.line(margin, footer_y + 11, PAGE_W - margin, footer_y + 11)
    c.setFont(FONT_MONO, 6.6)
    c.setFillColor(MUTED)
    footer = "FULL CASE STUDIES, SOURCE LINKS AND EVIDENCE: TOMERNAYDNOV.COM/WORK"
    c.drawString(margin, footer_y, footer)
    c.linkURL(
        "https://tomernaydnov.com/work",
        (margin, footer_y - 2, margin + pdfmetrics.stringWidth(footer, FONT_MONO, 6.6), footer_y + 8),
        relative=0,
    )

    if min(left_y, right_y) < footer_y + 18:
        raise RuntimeError(f"CV content overflowed the safe footer area: left={left_y:.1f}, right={right_y:.1f}")

    c.showPage()
    c.save()
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    build()
