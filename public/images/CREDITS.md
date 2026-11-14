# Image credits

All photography on the demo site is served from Unsplash (`images.unsplash.com`)
under the [Unsplash License](https://unsplash.com/license): free to use, no
attribution required. Nothing is stored in this folder; the URLs live in
`src/config/clinic.config.ts`.

Every URL below was checked on 14 Nov 2026 and returned HTTP 200. Each image
was viewed to confirm there are no close-up teeth shots.

Photographer names are not recorded here. Look each photo up on unsplash.com
and add the name before using the template for a real client, or replace the
image with the clinic's own photography.

## Clinic interiors

| Used for | Config key | Image URL |
| --- | --- | --- |
| Home hero, About room 1 | `images.hero`, `images.rooms[0]` | https://images.unsplash.com/photo-1629909613654-28e377c37b09 |
| About banner, About room 3 | `images.about`, `images.rooms[2]` | https://images.unsplash.com/photo-1629909615184-74f495363b67 |
| About room 2 | `images.rooms[1]` | https://images.unsplash.com/photo-1598256989800-fe5f95da9787 |
| About technology | `images.technology` | https://images.unsplash.com/photo-1606811841689-23dfddce3e95 |

## Team portraits

Stock portraits of models. They are not the people named on the site, who are
fictional. Each portrait was viewed at the size the site serves it (800 x 1000)
to confirm no name, logo or badge is visible. Two earlier picks were replaced
for that reason: photo-1594824476967-48c8b964273f (name embroidered on scrubs)
and photo-1559839734-2b71ea197ec2 (emblem on coat pocket). Do not reuse them.

| Used for | Config key | Image URL |
| --- | --- | --- |
| Dr Sarah Mitchell | `dentists[0].photo` | https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e |
| Dr James Patel | `dentists[1].photo` | https://images.unsplash.com/photo-1612349317150-e413f6a5b16d |
| Dr Elena Rossi | `dentists[2].photo` | https://images.unsplash.com/photo-1607746882042-944635dfe10e |
| Emma Clarke | `dentists[3].photo` | https://images.unsplash.com/photo-1580489944761-15a19d654956 |

## Before and after (illustrative)

One portrait per treatment. The "before" side is the same photo muted with a
CSS filter. These are not patient photographs and every slider is labelled
"Illustrative images".

| Used for | Config key | Image URL |
| --- | --- | --- |
| Teeth whitening | `beforeAfter[0].image` | https://images.unsplash.com/photo-1494790108377-be9c29b29330 |
| Composite bonding | `beforeAfter[1].image` | https://images.unsplash.com/photo-1500648767791-00dcc994a43e |
| Clear aligners | `beforeAfter[2].image` | https://images.unsplash.com/photo-1544005313-94ddf0286df2 |
