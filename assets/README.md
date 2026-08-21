# Image slots

Every image here is optional. If a file is missing the UI falls back to a
designed placeholder (monogram tile / gradient banner), so the page never
shows a broken image.

## logos/  — square company + school marks
Used as the tile on the experience rail and on the education cards.
Square, 128×128 or larger, PNG with transparency works best.
Referenced by the `logo:` field in data.js:

    logos/nyu.png        NYU IT · HSRN, and the NYU education card
    logos/cusp.png       RUN Lab · NYU CUSP
    logos/uw.png         Golub Lab · UW, and the UW education card
    logos/wt.png         Washington Tunneling
    logos/nokia.png      Nokia
    logos/techcarrot.png techcarrot
    logos/jacobs.png     Jacobs Solutions

## campus/ — wide campus photos
Banner across the top of an education card. Roughly 5:2, 1000px+ wide.
Referenced by the `banner:` field in data.js:

    campus/nyu.jpg
    campus/uw.jpg

Fallback: a soft accent gradient, which looks intentional on its own.
