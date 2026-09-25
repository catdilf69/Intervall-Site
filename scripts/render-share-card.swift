import AppKit
import CoreText

// Reproducible brand artwork, using the same logo and typeface as the site.
let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let fontURL = root.appendingPathComponent("assets/wide.otf")
CTFontManagerRegisterFontsForURL(fontURL as CFURL, .process, nil)
let descriptors = CTFontManagerCreateFontDescriptorsFromURL(fontURL as CFURL) as! [CTFontDescriptor]
let fontName = CTFontDescriptorCopyAttribute(descriptors[0], kCTFontNameAttribute) as! String
let width = 1200, height = 630
let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: width, pixelsHigh: height, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: bitmap)
let background = NSColor(srgbRed: 13/255, green: 13/255, blue: 13/255, alpha: 1)
let cream = NSColor(srgbRed: 219/255, green: 216/255, blue: 197/255, alpha: 1)
background.setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()
let logo = NSImage(contentsOf: root.appendingPathComponent("assets/mark.png"))!
logo.draw(in: NSRect(x: 72, y: 478, width: 150, height: 75))
func label(_ text: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat, wide: Bool = false) {
    let font = wide ? NSFont(name: fontName, size: size)! : NSFont.systemFont(ofSize: size, weight: .regular)
    (text as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: font, .foregroundColor: cream])
}
label("Intervall", 64, 270, 140, wide: true)
label("Your workout. Your rhythm.", 72, 204, 32, wide: true)
label("Custom interval workouts. Control from your wrist.", 72, 126, 27)
label("iPhone + Apple Watch", 72, 69, 23)
NSGraphicsContext.restoreGraphicsState()
try bitmap.representation(using: .png, properties: [:])!.write(to: root.appendingPathComponent("assets/intervall-share-v1.png"))
