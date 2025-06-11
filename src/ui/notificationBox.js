export function makeNotificationBox(k, subtitleContent) {
  const groupCenterY = k.center().y;

  const title1 = k.add([
    k.text("WHAT MADE", {
      font: "glyphmesss",
      size: 64,
    }),
    k.pos(k.center().x, groupCenterY - 70), // top line
    k.anchor("center"),
    k.color(k.Color.fromHex("#FFDF78")),
  ]);

  const title2 = k.add([
    k.text("ALICE BROKE?", {
      font: "glyphmesss",
      size: 64,
    }),
    k.pos(k.center().x, groupCenterY), // middle line
    k.anchor("center"),
    k.color(k.Color.fromHex("#FFDF78")),
  ]);

  const subtitle = k.add([
    k.text(subtitleContent, {
      font: "glyphmesss",
      size: 18,
      align: "center",
      width: 500,
      lineSpacing: 8,
    }),
    k.pos(k.center().x, groupCenterY + 70), // bottom text
    k.anchor("center"),
    k.color(k.Color.fromHex("#FFDF78")),
  ]);

  return [title1, title2, subtitle];
}
