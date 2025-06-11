export function makeNotificationBox(k, subtitleContent) {
  const title1 = k.add([
    k.text("WHAT MADE", {
      font: "glyphmesss",
      size: 64,
    }),
    k.pos(k.center().x, k.center().y - 100),
    k.anchor("center"),
    k.color(k.Color.fromHex("#eacfba")),
  ]);

  const title2 = k.add([
    k.text("ALICE BROKE?", {
      font: "glyphmesss",
      size: 64,
    }),
    k.pos(k.center().x, k.center().y - 40),
    k.anchor("center"),
    k.color(k.Color.fromHex("#eacfba")),
  ]);

  const subtitle = k.add([
    k.text(subtitleContent, {
      font: "glyphmesss",
      size: 18,
      align: "center",
      width: 500,
      lineSpacing: 8,
    }),
    k.pos(k.center().x, k.center().y + 40),
    k.anchor("center"),
    k.color(k.Color.fromHex("#eacfba")),
  ]);

  return [title1, title2, subtitle];
}
