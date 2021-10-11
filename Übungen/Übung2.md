# Übung 2

## 2.1. Responsiv mit Flexbox Desktop-First (3 Punkte)
Spielen Sie zunächst das Flexbox Froggy-Spiel, um Flexbox zu lernen.

Implementieren Sie dann ausschließlich mit HTML und CSS Flexbox folgendes responsive Webdesign nach der Desktop-First-Strategie!

<img src="./Assets/2.ResponsiveWebDesign/holy-grail1.png" width="250" height="400">

```html

```

## 2.2. Responsiv mit Grid Mobile-First (2 Punkte)
Spielen Sie zunächst das Grid Garden -Spiel, um Grid Layout zu lernen.

Implementieren Sie dann das gleiche responsive Webdesign wie in Aufgabe 2.1 allerdings mit Grid und der Mobile-First-Strategie! Vermeiden Sie diesmal außerdem das Erscheinen von Scrollbars.

```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .page {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr 1fr 3fr 1fr;
                background-color: white;
                grid-gap: 1px;
                justify-content: stretch; 
            }

            .headline {
                grid-row: 1;
                grid-column: span 3;
                text-align: center;
                background-color: red;
            }

            .left{
                grid-row: 2;
                grid-column: span 2;
                text-align: center;
                background-color: green;
            }

            .content{
                grid-row: 3;
                grid-column: span 2;
                text-align: center;
                background-color: blue;
            }
            
            .right{
                grid-row: 4;
                grid-column: span 2;
                text-align: center;
                background-color: violet;
            }

            /* joegalley.com/articles/mobile-first-vs-desktop-first-media-queries */
            @media (min-width: 992px) {	
                .page {
                    display: grid;
                    grid-template-rows: 1fr 2fr 1fr;
                    grid-template-columns: 1fr 2fr;
                    background-color: white;
                    grid-gap: 1px;
                    justify-content: stretch;
                }

                .left{
                    grid-row: 2;
                    grid-column: 1;
                }

                .content{
                    grid-row: 2;
                    grid-column: 2;
                }
                
                .right{
                    grid-row: 3;
                    grid-column: span 3;
                }
            }
            
            @media (min-width: 1200px) {
                .page {
                    display: grid;
                    grid-template-rows: 1fr 3fr;
                    grid-template-columns: 1fr 2fr 1fr;
                    background-color: white;
                    grid-gap: 1px;
                    justify-content: stretch;
                }
  
                .left{
                    grid-row: 2;
                    grid-column: 1;
                }

                .content{
                    grid-row: 2;
                    grid-column: 2;
                }
                
                .right{
                    grid-row: 2;
                    grid-column: 3;
                }
            }
        </style>
    </head>
    <body>
        <div class="page">
            <div class="headline"><h1>Headline</h1></div>
            <div class="left">Left</div>
            <div class="content">Content</div>
            <div class="right">Right</div>
        </div>
    </body>
</html>
```