from pathlib import Path
from PIL import Image, ImageOps, ImageEnhance, ImageDraw, ImageFilter
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
import shutil

ROOT = Path(__file__).resolve().parents[1]
TMP = ROOT / "tmp" / "pdfs"
OUT = ROOT / "output" / "pdf" / "abhishek-aditi-wedding-invitation-review.pdf"
PUBLIC_COPY = ROOT / "public" / "abhishek-aditi-wedding-invitation.pdf"
TMP.mkdir(parents=True, exist_ok=True)
OUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)
W, H = A4

bg_path = TMP / "invitation-background.jpg"
couple_path = TMP / "couple-small.png"
with Image.open(ROOT / "src/assets/hero-palace.jpg") as image:
    background = ImageOps.fit(image.convert("RGB"), (1240, 1754), method=Image.Resampling.LANCZOS, centering=(0.5, 0.48))
background = ImageEnhance.Color(background).enhance(0.75)
background = Image.alpha_composite(background.convert("RGBA"), Image.new("RGBA", background.size, (5, 9, 28, 202)))
glow = Image.new("RGBA", background.size, (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse((260, 320, 1000, 1500), fill=(191, 133, 45, 30))
background = Image.alpha_composite(background, glow.filter(ImageFilter.GaussianBlur(170))).convert("RGB")
background.save(bg_path, "JPEG", quality=86, optimize=True)
with Image.open(ROOT / "src/assets/couple.webp") as image:
    ImageOps.contain(image.convert("RGBA"), (600, 820), method=Image.Resampling.LANCZOS).save(couple_path, optimize=True)

font_dir = Path(r"C:\Windows\Fonts")
for name, filename in [("Georgia", "georgia.ttf"), ("Georgia-Bold", "georgiab.ttf"), ("Georgia-Italic", "georgiai.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(font_dir / filename)))

gold = HexColor("#E7BF68")
light = HexColor("#F4DFA8")
cream = HexColor("#FFF4D8")
muted = HexColor("#D6C9A7")
card = HexColor("#0A1029")
line = HexColor("#A17B3E")
pdf = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
pdf.setTitle("Abhishek and Aditi - Wedding Invitation")
pdf.setAuthor("Abhishek and Aditi")

home = "https://www.google.com/maps/place/ss+home+care/@26.8935201,75.7222387,21z/data=!4m6!3m5!1s0x396db500622868e7:0xd3e383741af612ef!8m2!3d26.8931031!4d75.7222034!16s%2Fg%2F11xtns7bst?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
shagun = "https://www.google.com/maps/place/Shagun+Banquets/@26.9722948,75.6313199,12z/data=!4m10!1m2!2m1!1sshagun+banquet+hall!3m6!1s0x396db3190bb53333:0xfc8bce6d6d40fd7e!8m2!3d26.9722948!4d75.7837552!15sChNzaGFndW4gYmFucXVldCBoYWxsWhUiE3NoYWd1biBiYW5xdWV0IGhhbGySAQxiYW5xdWV0X2hhbGzgAQA!16s%2Fg%2F11m9_8_gw_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
geetanjali = "https://www.google.com/maps/place/Geetanjali+Banquet+%7C+A+Multipurpose+Event+Venue/@26.8858086,75.7293834,18.63z/data=!4m6!3m5!1s0x396db5534eea08b5:0xc861918af3e93d10!8m2!3d26.8851119!4d75.7301887!16s%2Fg%2F11h5qnqyv_?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
baraat_map = "https://www.google.com/maps/place/Ranbanka+Marriage+Garden/@26.9220277,75.7327245,17z/data=!3m1!4b1!4m6!3m5!1s0x396db35da02a132f:0xc5c982156c4dcd0b!8m2!3d26.9220277!4d75.7352994!16s%2Fg%2F1hjh7hcwl?entry=ttu"

events = [
    ("Mehndi", "09 December 2026", "", "Home", home, ROOT / "src/assets/mehndi-ceremony.png"),
    ("Haldi", "10 December 2026", "", "Shagun Banquet", shagun, ROOT / "src/assets/haldi-ceremony.png"),
    ("Engagement", "10 December 2026", "", "Shagun Banquet", shagun, ROOT / "src/assets/engagement-poster.webp"),
    ("Sangeet", "10 December 2026", "", "Shagun Banquet", shagun, ROOT / "src/assets/sangeet-new.jpg"),
    ("Lagan", "11 December 2026", "", "Geetanjali Banquet", geetanjali, ROOT / "src/image.png"),
    ("Baraat", "12 December 2026", "6:30 PM", "Ranbanka Marriage Garden, Vaishali Nagar", baraat_map, ROOT / "src/assets/baraat.jpg"),
]

def draw_background():
    pdf.drawImage(str(bg_path), 0, 0, width=W, height=H)
    pdf.setStrokeColor(gold)
    pdf.setLineWidth(0.9)
    pdf.roundRect(22, 22, W-44, H-44, 14, stroke=1, fill=0)
    pdf.setStrokeColor(HexColor("#8E6A33"))
    pdf.setLineWidth(0.45)
    pdf.roundRect(28, 28, W-56, H-56, 11, stroke=1, fill=0)
    for x in (42, W-42):
        for y in (42, H-42):
            pdf.saveState()
            pdf.translate(x, y)
            pdf.rotate(45)
            pdf.setFillColor(gold)
            pdf.rect(-2.6, -2.6, 5.2, 5.2, stroke=0, fill=1)
            pdf.restoreState()

def center(text, y, font, size, color):
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    pdf.drawCentredString(W/2, y, text)

def wrapped(text, x, y, max_width, font="Georgia", size=7.1, leading=9, color=muted):
    pdf.setFont(font, size)
    pdf.setFillColor(color)
    words, line_text, lines = text.split(), "", []
    for word in words:
        candidate = (line_text + " " + word).strip()
        if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
            line_text = candidate
        else:
            if line_text:
                lines.append(line_text)
            line_text = word
    if line_text:
        lines.append(line_text)
    for row in lines[:3]:
        pdf.drawString(x, y, row)
        y -= leading

# Cover page
draw_background()
center("A ROYAL INVITATION", 758, "Georgia-Bold", 8.5, gold)
center("Abhi Ki Aditi", 710, "Georgia-Italic", 35, light)
center("With hearts full of love and joy,", 677, "Georgia-Italic", 13.2, cream)
center("we invite you to celebrate the wedding ceremony of", 657, "Georgia", 10.3, muted)
center("ABHISHEK  &  ADITI", 622, "Georgia-Bold", 13, gold)
pdf.setStrokeColor(HexColor("#806335"))
pdf.setLineWidth(0.55)
pdf.line(66, 603, W-66, 603)
center("Son of Mrs. Bhawana Sharma & Mr. Brijesh Sharma", 584, "Georgia-Bold", 8.4, cream)
center("Daughter of Mrs. Kiran Sharma & Mr. Gopal Lal Sharma", 568, "Georgia-Bold", 8.4, cream)
couple = ImageReader(Image.open(couple_path).convert("RGBA"))
pdf.drawImage(couple, (W-206)/2, 281, 206, 255, mask="auto", preserveAspectRatio=True, anchor="c")
pdf.setStrokeColor(gold)
pdf.setLineWidth(0.65)
pdf.line(90, 262, W/2-32, 262)
pdf.line(W/2+32, 262, W-90, 262)
pdf.setFillColor(gold)
pdf.circle(W/2, 262, 2.2, stroke=0, fill=1)
center("THE CELEBRATIONS", 241, "Georgia-Bold", 8, gold)
center("09 - 12 December 2026", 222, "Georgia-Italic", 13, light)
center("Mehndi  ·  Haldi  ·  Engagement  ·  Sangeet  ·  Lagan  ·  Baraat", 201, "Georgia", 8, cream)
center("We look forward to celebrating with you", 83, "Georgia-Italic", 10, cream)
center("WITH LOVE  -  ABHISHEK & ADITI", 61, "Georgia-Bold", 7.2, gold)
pdf.showPage()

# Illustrated event details page
draw_background()
center("THE CELEBRATIONS", 786, "Georgia-Italic", 12, gold)
center("Six moments, one beautiful beginning", 766, "Georgia", 9, cream)
left, gap_x, card_w, card_h = 38, 10, (W-76-20)/3, 286
row_bottoms = (456, 142)
for index, (name, date, time, venue, url, image_path) in enumerate(events):
    row, col = divmod(index, 3)
    x = left + col*(card_w+gap_x)
    y = row_bottoms[row]
    pdf.setFillColor(card)
    pdf.setStrokeColor(line)
    pdf.setLineWidth(0.65)
    pdf.roundRect(x, y, card_w, card_h, 9, stroke=1, fill=1)
    pdf.setFillColor(HexColor("#FFF5E2"))
    pdf.roundRect(x+9, y+130, card_w-18, 142, 6, stroke=0, fill=1)
    with Image.open(image_path) as image:
        art = ImageOps.contain(image.convert("RGBA"), (int((card_w-26)*3), 396), method=Image.Resampling.LANCZOS)
        art_path = TMP / (name.lower()+"-pdf.png")
        art.save(art_path, optimize=True)
    art_reader = ImageReader(Image.open(art_path))
    art_w, art_h = art_reader.getSize()
    max_w, max_h = card_w-26, 132
    scale = min(max_w/art_w, max_h/art_h)
    draw_w, draw_h = art_w*scale, art_h*scale
    pdf.drawImage(art_reader, x+(card_w-draw_w)/2, y+135+(max_h-draw_h)/2, width=draw_w, height=draw_h, mask="auto")
    pdf.setFont("Georgia-Bold", 10)
    pdf.setFillColor(gold)
    pdf.drawCentredString(x+card_w/2, y+112, name.upper())
    pdf.setFont("Georgia", 7.1)
    pdf.setFillColor(cream)
    pdf.drawCentredString(x+card_w/2, y+96, date.upper())
    if time:
        pdf.setFillColor(light)
        pdf.drawCentredString(x+card_w/2, y+82, time)
    venue_y = y + (68 if time else 75)
    wrapped(venue, x+12, venue_y, card_w-24, size=7.1, leading=9, color=muted)
    pdf.linkURL(url, (x+9, y+12, x+card_w-9, y+91), relative=0, thickness=0)
center("Tap a venue name in the PDF to open its map", 94, "Georgia-Italic", 8, cream)
center("WITH LOVE  -  ABHISHEK & ADITI", 65, "Georgia-Bold", 7.2, gold)
pdf.showPage()
pdf.save()
shutil.copy2(OUT, PUBLIC_COPY)
print(f"Wrote {OUT} ({OUT.stat().st_size} bytes)")
print(f"Wrote {PUBLIC_COPY} ({PUBLIC_COPY.stat().st_size} bytes)")
