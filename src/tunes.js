export const stranger_tune = `setcps(140/60/4)


// This tunes.js is edited too, This file manages to accept values from the slider or buttons and then load them perfectly into strudel.


samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

// Here i have added the volume which checks if the variable is present if not take volume as 1

const basslineVolume = window.instrumentVolumes?.Bassline ?? 1;
const mainArpVolume = window.instrumentVolumes?.["Main Arp"] ?? 1;
const drumsVolume = window.instrumentVolumes?.Drums ?? 1;
const drums2Volume = window.instrumentVolumes?.Drums2 ?? 1;

const basslineEcho = window.instrumentEchoes?.Bassline ?? 0;
const mainArpEcho  = window.instrumentEchoes?.["Main Arp"] ?? 0;
const drumsEcho    = window.instrumentEchoes?.Drums ?? 0;
const drums2Echo   = window.instrumentEchoes?.Drums2 ?? 0;

const basslineReverse = window.instrumentReverses?.Bassline ?? false;
const mainArpReverse = window.instrumentReverses?.["Main Arp"] ?? false;
const drumsReverse = window.instrumentReverses?.Drums ?? false;
const drums2Reverse = window.instrumentReverses?.Drums2 ?? false;


const basslineRoom = window.instrumentRooms?.Bassline ?? 0.5;
const mainArpRoom = window.instrumentRooms?.["Main Arp"] ?? 0.5;
const drumsRoom = window.instrumentRooms?.Drums ?? 0.5;
const drums2Room = window.instrumentRooms?.Drums2 ?? 0.5;

const basslineSpeed = window.instrumentSpeeds?.Bassline ?? 1;
const mainArpSpeed = window.instrumentSpeeds?.["Main Arp"] ?? 1;
const drumsSpeed = window.instrumentSpeeds?.Drums ?? 1;
const drums2Speed = window.instrumentSpeeds?.Drums2 ?? 1;

const gain_patterns = [
  "2",
  "{0.75 2.5}*4",
  "{0.75 2.5!9 0.75 2.5!5 0.75 2.5 0.75 2.5!7 0.75 2.5!3 <2.5 0.75> 2.5}%16",
]

const drum_structure = [
  "~",
  "x*4",
  "{x ~!9 x ~!5 x ~ x ~!7 x ~!3 < ~ x > ~}%16",
]

const basslines = [
  "[[eb1, eb2]!16 [f2, f1]!16 [g2, g1]!16 [f2, f1]!8 [bb2, bb1]!8]/8",
  "[[eb1, eb2]!16 [bb2, bb1]!16 [g2, g1]!16 [f2, f1]!4 [bb1, bb2]!4 [eb1, eb2]!4 [f1, f2]!4]/8"
]

const arpeggiator1 = [
  "{d4 bb3 eb3 d3 bb2 eb2}%16",
  "{c4 bb3 f3 c3 bb2 f2}%16",
  "{d4 bb3 g3 d3 bb2 g2}%16",
  "{c4 bb3 f3 c3 bb2 f2}%16",
]

const arpeggiator2 = [
  "{d4 bb3 eb3 d3 bb2 eb2}%16",
  "{c4 bb3 f3 c3 bb2 f2}%16",
  "{d4 bb3 g3 d3 bb2 g2}%16",
  "{d5 bb4 g4 d4 bb3 g3 d4 bb3 eb3 d3 bb2 eb2}%16",
]

const pattern = 0
const bass = 0

bassline:
note(pick(basslines, bass))
.sound("supersaw")
.postgain(basslineVolume)
.room(basslineRoom)
.lpf(700)
.room(basslineRoom)
.delay(basslineEcho)
.speed(basslineSpeed)
.jux(basslineReverse ? rev : id)

main_arp:
note(pick(arpeggiator1, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(300)
.adsr("0:0:.5:.1")
.room(mainArpRoom)
.lpenv(3.3)
.postgain(mainArpVolume)
.delay(mainArpEcho)
.speed(mainArpSpeed)
.jux(mainArpReverse ? rev : id)

drums:
stack(
  s("tech:5")
  .postgain(drumsVolume * 6)
  .pcurve(2)
  .pdec(1)
  .struct(pick(drum_structure, pattern))
  .delay(drumsEcho)
  .speed(drumsSpeed)
  .room(drumsRoom)
  .jux(drumsReverse ? rev : id),

  s("sh").struct("[x!3 ~!2 x!10 ~]")
  .postgain(drumsVolume * 0.5)
  .lpf(7000)
  .bank("RolandTR808")
  .speed(0.8)
  .speed(drumsSpeed)
  .jux(drumsReverse ? rev : id)
  .room(sine.range(0.1,0.4))
  .gain(drumsVolume * 0.6)
  .delay(drumsEcho),

  s("{~ ~ rim ~ cp ~ rim cp ~!2 rim ~ cp ~ < rim ~ >!2}%8 *2")
  .bank("[KorgDDM110, OberheimDmx]")
  .speed(1.2)
  .postgain(drumsVolume * 0.25)
  .delay(drumsEcho)
  .speed(drumsSpeed)
  .room(drumsRoom)
  .jux(drumsReverse ? rev : id)
)

drums2:
stack(
  s("[~ hh]*4").bank("RolandTR808").room(drums2Room).speed(0.75 * drums2Speed).gain(drums2Volume * 1.2).delay(drums2Echo).jux(drums2Reverse ? rev : id),
  s("hh").struct("x*16").bank("RolandTR808")
  .gain(drums2Volume * 0.6)
  .jux(drums2Reverse ? rev : id)
  .room(sine.range(0.1,0.4))
  .postgain(drums2Volume * 0.5)
  .delay(drums2Echo)
  .speed(drums2Speed),

  s("[psr:[2|5|6|7|8|9|12|24|25]*16]?0.1")
  .gain(drums2Volume * 0.1)
  .postgain(pick(gain_patterns, pattern))
  .hpf(1000)
  .speed(0.5 * drums2Speed)
  .rarely(jux(rev))
  .delay(drums2Echo),
)
`;