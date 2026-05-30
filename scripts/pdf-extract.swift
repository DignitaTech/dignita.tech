import Foundation
import PDFKit
import AppKit

// Uso: swift scripts/pdf-extract.swift <pdf> <outDir> <scale> <page1> [page2 ...]
let args = CommandLine.arguments
guard args.count >= 5 else {
    FileHandle.standardError.write("Uso: pdf-extract <pdf> <outDir> <scale> <page...>\n".data(using: .utf8)!)
    exit(1)
}
let pdfPath = args[1]
let outDir = args[2]
let scale = CGFloat(Double(args[3]) ?? 2.0)
let pages = args[4...].compactMap { Int($0) }

guard let doc = PDFDocument(url: URL(fileURLWithPath: pdfPath)) else {
    FileHandle.standardError.write("No pude abrir el PDF\n".data(using: .utf8)!)
    exit(1)
}
try? FileManager.default.createDirectory(atPath: outDir, withIntermediateDirectories: true)

for p in pages {
    guard let page = doc.page(at: p - 1) else { continue }      // 1-indexed -> 0-indexed
    let rect = page.bounds(for: .mediaBox)
    let img = NSImage(size: NSSize(width: rect.width * scale, height: rect.height * scale))
    img.lockFocus()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    ctx.setFillColor(NSColor.white.cgColor)
    ctx.fill(CGRect(x: 0, y: 0, width: rect.width, height: rect.height))
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    img.unlockFocus()
    guard let tiff = img.tiffRepresentation,
          let rep = NSBitmapImageRep(data: tiff),
          let png = rep.representation(using: .png, properties: [:]) else { continue }
    let out = "\(outDir)/page-\(p).png"
    try? png.write(to: URL(fileURLWithPath: out))
    print("✓ \(out)")
}
