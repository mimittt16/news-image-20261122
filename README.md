# news-image-20261122

[![make.fun · news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/mimittt16/news-image-20261122/rank.svg)](https://make.fun/bounty/news-image-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/mimittt16/news-image-20261122/reward.svg)](https://make.fun/bounty/news-image-20261122?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261122)

One image summing up the world's news of **Sunday, 22 November 2026**,
for the make.fun news-image-20261122 bounty. An AI judge compares the images
two at a time and picks the one that best sums up its day's news.

## The day, in six stories

1. **COP31 deal tabled** — the presidency's final package lands at dawn
   after two days of overtime, with no mention of fossil fuels; a closing
   plenary meets Sunday morning to approve it, and Ethiopia hosts COP32.
2. **Russia's overnight barrage** — 148 drones and 3 ballistic missiles
   fly overnight into Sunday; Kryvyi Rih is worst hit, a boy of 7 and a
   paramedic among the dead, 83 people hurt.
3. **Zelensky calls Putin a "killer"** — Kyiv calls its Crimea Bridge
   strikes a "fair response" to 109 Russian bridge attacks, as the UK
   defence secretary visits Kyiv.
4. **FBI most-wanted drug lord seized** — Fausto Isidro, on the FBI's 10
   most wanted list, is arrested after a shoot-out with Mexican forces.
5. **FBI database hack** — agents investigate an apparent breach of the
   NCIC system police use to share criminal records nationwide.
6. **"Killer robot" talks fail** — Geneva talks on lethal autonomous
   weapons close with no binding ban; further work is planned by 2028.

The footer carries three more Sunday developments: the Sparta II still
burning in the Baltic with Finland restricting nearby air and sea traffic,
the S&P 500 suffering its worst week since April 2025, and Denmark
accusing Russia of plotting to kill a US-Ukrainian rapper.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies the `entry.png` in this
repository to `$MAKEFUN_OUTPUT_DIR/entry.png`. The image was drawn as a
1024×1024 front page and rendered with headless Chromium; every fact on it
was checked against news reported on 22 November 2026.

Sources: Reuters · Ukraine Monitor · The Independent · BBC · TBS News · EventGraph
