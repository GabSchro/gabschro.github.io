window.onload = function() {
    
    /***Getting all elements needed with DOM****/
        var que = document.getElementsByClassName("q");
        var ans = document.getElementsByClassName("a");
        var letCont = document.getElementById("letters");
        var germat = [];//all letters in an array
        var output = document.getElementById("whatsin");
        var del = document.getElementById("del");
        var corr = document.getElementById("corr");
        var pot = document.getElementById("pot");
        var youwon = document.getElementById("youwon");
        var score = document.getElementById("score");
        var next = document.getElementById("next");
        var goon = document.getElementsByClassName("goon");
        var firstPage = document.getElementById("firstpage");
        var playground = document.getElementById("playground");
        var puf = document.getElementsByClassName("fishek");
        var pika = document.getElementById("pika");
        var hl = document.getElementById("hl");
        
    /****************OTHER VARIABLES************/
        var brLine;
        var gInd = 0;
        var shuff = [];
        var undo = [];
        var teSakta = 0;
        var addColor = "";
        var totalLets = 0;
        var chosen;
        var paint;
        var it = 0;
        var hintLeft = 4;
        var actual;
        var noHint = [];
        var free;
        var heve = false;
        
    /***********SHUFFLE LEVELS FUNC*************/
        function shuffleLevels(arr) {
            var shuffled = [];
            shuffled.length = arr.length;
            for(var ij = 0; ij<arr.length; ij++) {
        //choose a random kl
                var kl = Math.floor(Math.random()*arr.length);
        //create shuffled elem equal with a[kl]
                shuffled[ij] = arr[kl];
        //careful if a[kl] is undefined because of delete and reprocess random process
                while(arr[kl] == undefined) {
                    kl = Math.floor(Math.random()*arr.length);
                    shuffled[ij] = arr[kl];
                }
        //delete chosen element so not to be repeated
                delete arr[kl];
            }
            return shuffled;
        }
    /**************Random Function**************/
        function rand(arr) {
            return arr[Math.floor(Math.random()*arr.length)];
        }
        
    /***********Generate random gradient********/
        var hexa = "123456789ABCDEF";
        hexa = hexa.split("");
        function randColor() { 
            return "#" + rand(hexa) + rand(hexa) + rand(hexa);
        }
    /************Winning message****************/
        function plas() {
            paint = randColor();
            pika.style.animation = "ngrihu 2s infinite";
            for(var c = 0; c<8; c++) {
                puf[c].style.animation = "plas 2s infinite";
                puf[c].style.backgroundColor = paint;
                puf[c].style.boxShadow = "2px 2px 5px " + paint + ",-2px 2px 5px " + paint + ",2px -2px 5px " + paint + ",-2px -2px 5px " + paint;
            }
        }
    
    /*******Creating blueprint for levels*******/
        function level(quest, letters, correct) {
            this.quest = quest;
            this.letters = letters;
            this.correct = correct;
            
        //Method to print data in playground
            this.addData = function() {
              for(var i=0; i<quest.length; i++) {
                    que[i].innerHTML = i+1 + ". " + this.quest[i];//add question
                    ans[i].innerHTML = this.correct[i].length + " letters";//addlength
                    for(var j = 0; j<germat.length; j++) {   
                       germat[j].style.display = "inline-block";
                       germat[j].style.background = "linear-gradient(" + randColor() + ", " + randColor() + ")";//color letters
                    }
                }
            };//addData method end
                            
        //Shuffling answers method
            this.shuffle = function shuffle() {
                for(var k = 0; k<15; k++) {
                    shuff[k] = rand(this.letters);
                    while(shuff[k] == shuff[k-1] || shuff[k] == shuff[k-2] || shuff[k] == shuff[k-3] || shuff[k] == shuff[k-4] || shuff[k] == shuff[k-5] || shuff[k] == shuff[k-6] || shuff[k] == shuff[k-7] || shuff[k] == shuff[k-8] || shuff[k] == shuff[k-9] || shuff[k] == shuff[k-10] || shuff[k] == shuff[k-11] || shuff[k] == shuff[k-12] || shuff[k] == shuff[k-13] || shuff[k] == shuff[k-14]) {
                         shuff[k] = rand(this.letters);
                    }                
                    germat[k].innerHTML = shuff[k];                
                }
            };//end of shuffle method
        
        //Check if correct answer method
            this.check = function check() {
                corr.onclick = function() {
                    for(var m = 0; m<correct.length; m++) {
                        if(output.innerHTML == correct[m].toUpperCase()) {
                            alert("You got one!");
                            ans[m].innerHTML = output.innerHTML;
                            teSakta++;
                            noHint.push(correct[m]);
                            totalLets += output.innerHTML.length;
                            score.innerHTML = totalLets;
                            output.innerHTML = "";
                            undo = [];
                            addColor += "," +  randColor();
                            pot.style.background = "linear-gradient(white " + (6-teSakta)*100/6 + "% " + addColor + ")";
                            break;
                        } else {
                            if(m == correct.length-1)
                            alert("Not a correct word!");
                        }
                    }
                //won level
                    if(teSakta == 6) {
                        alert("You won!");
                        pot.style.background = "linear-gradient(white, white)";
                        youwon.style.display = "block";
                        teSakta = 0;
                        hintLeft++;
                        hl.innerHTML = hintLeft;
                        addColor = "";
                        var fire = setInterval(plas, 2000);
                    }
                };
            };
            
            /**************WORKING WITH HINT METHOD***********/
            this.hintMethod = function hintMethod() {
                if(noHint.length == 0) {
                    actual = rand(this.correct);
                } else {
                    free = false;
                    while(!free) {
                        actual = rand(this.correct);
                        for(var p = 0; p<noHint.length; p++) {
                            if(actual == noHint[p]) {
                                actual = rand(this.correct);
                                free = false;
                                break;
                            } else {
                                free = true;
                            }
                        }
                    }
                }
            };
            
            
        }//object initializer end
            
        
        
    /*********Structure letters container*******/
        for(var i = 1; i<20; i++) {
            if(i%4 == 0) {
                brLine = document.createElement("br");
                letCont.appendChild(brLine);
            } else {
                germat[gInd] = document.createElement("span");
                letCont.appendChild(germat[gInd]);
                gInd++;
            }
        }
    
    /************Select as part of answer*******/
        for(var l = 0; l<germat.length; l++) {
            germat[l].onclick = function() {
                if(output.innerHTML.length > 8) {
                    alert("The length cannot be more than 10 letters!");
                } else {
                    output.innerHTML += this.innerHTML;
                    undo.push(this);
                    this.style.display = "none";
                }
            }
        }
    /**************Empty answer*****************/
        del.onclick = function() {
            output.innerHTML = "";
            for(var n = 0; n<undo.length; n++) {
                undo[n].style.display = "inline-block";
            }
            undo = [];
        }
        
    /************Creating levels****************/
        var levels = [
            new level(["Component of a plant...", "Component of human body...", "Component of a cell...", "Component of a computer...", "Component of a detergent...", "Component of a dessert..."], ["XY", "LEM", "KID", "NE", "YS", "RIB", "OS", "OME", "MO", "USE", "EN", "ZY", "ME", "FL", "OUR"], ["Xylem", "Kidneys", "Ribosome", "Mouse", "Enzyme", "Flour"]),
            new level(["Is used while studying...", "Is used while cleaning...","Is used while writing...","Is used while fighting...","Is used while having shower...","Is used while eating..."], ["BO", "OK", "CLE", "AN", "ER", "PA", "PER", "PI", "LL", "OW", "SH", "AMP", "OO", "SP", "OON"], ["Book", "Cleaner", "Paper", "Pillow", "Shampoo", "Spoon"]),
            new level(["Works in a computer...", "Works in a classroom...", "Works in a hospital...", "Works up in the air...", "Works in a restaurant...", "Works in an office..."], ["PRO", "GRA", "MM", "ER", "TE", "AC", "HER", "NU", "RSE", "PI", "LOT", "CH", "EF", "BO", "SS"], ["Programmer", "Teacher", "Nurse", "Pilot", "Chef", "Boss"]),
            new level(["Country in Asia...", "Country in Africa...","Country in North America...","Country in Latin America...","Country in Oceania...","Country in Europe..."], ["QA", "TAR", "SEN", "EG", "AL", "CAN", "ADA", "CO", "LOM", "BIA", "NA", "URU", "SLO", "VEN", "IA"], ["Qatar", "Senegal", "Canada", "Colombia", "Nauru", "Slovenia"]),
            new level(["Red vegetable...", "Green vegetable...", "Yellow vegetable...", "Violet vegetable...", "White vegetable...", "Orange vegetable..."], ["RAD", "ISH", "LET", "TU", "CE", "PEP", "PER", "EGG", "PLA", "NT", "GAR", "LIC", "PU", "MP", "KIN"], ["Radish", "Lettuce", "Pepper", "Eggplant", "Garlic", "Pumpkin"]),
            new level(["Memory Transporter...", "Metallic Transporter...", "Living Transporter...", "Goods Transporter...", "Food Transporter...", "Electron Transporter..."], ["DI", "SK", "PL", "ANE", "DO", "NK", "EY", "TR", "AIN", "DE", "LIV", "ERY", "CU", "RR", "ENT"], ["Disk", "Plane", "Donkey", "Train", "Delivery", "Current"]),
            new level(["A type of dog...", "A type of cat...", "A type of snake...", "A type of bear...", "A type of bird...", "A type of fish..."], ["AK", "IDA", "SI", "AME", "SE", "PYT", "HON", "GRI", "ZZ", "LY", "PEA", "CO", "CK", "CLO", "WN"], ["Akida", "Siamese", "Python", "Grizzly", "Peacock", "Clown"]),
            new level(["Men clothes...", "Women clothes...", "Winter clothes...", "Summer clothes...", "Party clothes...", "Serious clothes..."], ["JA", "CK", "ET", "SKI", "RT", "CO", "AT", "SH", "OR", "TS", "DR", "ESS", "TU", "XE", "DO"], ["Jacket", "Skirt", "Coat", "Shorts", "Dress", "Tuxedo"]),
            new level(["A mammal...", "A bird...", "A reptile...", "An amphibian...", "A fish...", "An archaea..."], ["LI", "ON", "EA", "GLE", "SN", "AKE", "SA", "LA", "MAN", "DER", "SH", "ARK", "BAC", "TER", "IA"], ["Lion", "Eagle", "Snake", "Salamander", "Shark", "Bacteria"]),
            new level(["Word used in Mathematics...", "Word used in Physics...", "Word used in Chemistry...", "Word used in Biology...", "Word used in Musics...", "Word used in Basketball..."], ["DER", "IVA", "TE", "SP", "EED", "REA", "CTI", "ON", "ANA", "TO", "MY", "TEM", "PO", "ASS", "IST"], ["Derivate", "Speed", "Reaction", "Anatomy", "Tempo", "Assist"]),
            new level(["Synonim of permitted...", "Synonim of make up for...", "Synonim of stare...", "Synonim of appear...", "Synonim of deliver...", "Synonim of giant..."], ["AL", "LOW", "ED", "CO", "MPE", "NS", "ATE", "GA", "ZE", "SH", "OW", "SPR", "EAD", "HU", "GE"], ["Allowed", "Compensate", "Gaze", "Show", "Spread", "Huge"]),
            new level(["Opposite of fat...", "Opposite of slim...", "Opposite of interesting...", "Opposite of liar...", "Opposite of progress...", "Opposite of cheap..."], ["SL", "IM", "FAT", "BOR", "ING", "HO", "NE", "ST", "REG", "RE", "SS", "EX", "PEN", "SI", "VE"], ["Slim", "Fat", "Boring", "Honest", "Regress", "Expensive"]),
            new level(["Kilimanjaro is a...", "Hulk is a...", "Baltic is a...", "Wembley is a...", "Cau Vang is a...", "Yukon is a..."], ["MO", "UN", "TA", "IN", "HE", "RO", "SEA", "ST", "ADI", "UM", "BR", "ID", "GE", "RI", "VER"], ["Mountain", "Hero", "Sea", "Stadium", "Bridge", "River"]),
            new level(["Represented as 'Hg'...", "Represented as 'v'...", "Represented as 'f'...", "Represented as 'Au'...", "Represented as 't'...", "Represented as 'O'..."], ["MER", "CU", "RY", "VEL", "OCI", "TY", "FU", "NCT", "ION", "GO", "LD", "TI", "ME", "OXY", "GEN"], ["Mercury", "Velocity", "Function", "Gold", "Time", "Oxygen"]),
            new level(["Found in the cave...", "Found at the bottom of the sea...", "Found in the desert...", "Found underground...", "Found in the air...", "Found in the sky..."], ["BAT", "SA", "ND", "OA", "SIS", "FO", "SS", "IL", "NI", "TR", "OG", "EN", "GA", "LA", "XY"], ["Bat", "Sand", "Oasis", "Fossil", "Nitrogen", "Galaxy"]),
            new level(["Has no legs...", "Has 2 legs...", "Has 4 legs...", "Has 6 legs...", "Has 8 legs...", "Has 10 legs..."], ["WO", "RM", "KAN", "GA", "ROO", "CAT", "BE", "ET", "LE", "SC", "OR", "PI", "ON", "CR", "AB"], ["Worm", "Kangaroo", "Cat", "Beetle", "Scorpion", "Crab"]),
            new level(["Height unit...", "Weight unit...", "Charge unit...", "Power unit...", "Time unit...", "Energy unit..."], ["MET", "ER", "POU", "ND", "COU", "LO", "MB", "WA", "TT", "MI", "LLE", "NI", "UM", "JO", "ULE"], ["Meter", "Pound", "Coulomb", "Watt", "Millenium", "Joule"]),
            new level(["May have 88 'things'...", "May have 3600 'things'...", "May have 100 'things'...", "May have 3, 5, 10 'things'...", "May have 6.02*10^23 'things'...", "May have 101 'things'..."], ["PI", "ANO", "HO", "UR", "CE", "NTI", "PE", "DES", "ST", "ARS", "MO", "LE", "KE", "YBO", "ARD"], ["Piano", "Hour", "Centipedes", "Stars", "Mole", "Keyboard"]),
            new level(["City in Spain...", "City in China...", "City in Germany...", "City in Italy...", "City in Russia...", "City in England..."], ["MAL", "AGA", "SH", "ANG", "HAI", "DUS", "SEL", "DO", "RF", "BA", "RI", "KA", "ZAN", "LEE", "DS"], ["Malaga", "Shanghai", "Dusseldorf", "Bari", "Kazan", "Leeds"]),
            new level(["Red liquid...", "Colourless liquid...", "Dark purple gas...", "Light green gas...", "Golden solid...", "Sivler solid..."], ["BL", "OOD", "LY", "MPH", "IO", "DI", "NE", "CH", "LOR", "INE", "GO", "LD", "SI", "LV", "ER"], ["Blood", "Lymph", "Iodine", "Chlorine", "Gold", "Silver"]),
            new level(["One is called Opel...", "One is called Ariston...", "One is called Kawasaki...", "One is called Versace...", "One is called Zara...", "One is called Michel Kors..."], ["CAR", "FR", "ID", "GE", "MO", "TO", "RC", "YC", "LE", "PER", "FU", "ME", "SHI", "RT", "BAG"], ["Car", "Fridge", "Motorcycle", "Perfume", "Shirt", "Bag"]),
            new level(["To achieve a goal...", "To feel very tired...", "To be keen on something...", "To be on the top...", "To receive something...", "To have an idol..."], ["SU", "CC", "EED", "EX", "HAU", "ST", "ED", "LI", "KE", "LE", "AD", "ER", "GET", "ADM", "IRE"], ["Succeed", "Exhausted", "Like", "Leader", "Get", "Admire"]),
            new level(["White flower...", "Yellow flower...", "Orange flower...", "Red flower...", "Green flower...", "Blue flower..."], ["GAR", "DEN", "IA", "DAH", "LIA", "ZIN", "NIA", "RO", "SE", "ORC", "HID", "NAR", "CI", "SS", "US"], ["Gardenia", "Dahlia", "Zinnia", "Rose", "Orchid", "Narcissus"]),
            new level(["0%...", "10%...", "25%...", "50%...", "75%...", "100%..."], ["NE", "VER", "RAR", "ELY", "SO", "MET", "IM", "ES", "OF", "TEN", "US", "UA", "LLY", "ALW", "AYS"], ["Never", "Rarely", "Sometimes", "Often", "Usually", "Always"]),
            new level(["You can watch it...", "You can gaze it...", "You can hear it...", "You can smell it...", "You can read it...", "You can come up with it..."], ["MO", "VIE", "ST", "AR", "SOU", "ND", "PER", "FU", "ME", "MA", "GA", "ZI", "NE", "ID", "EA"], ["Movie", "Star", "Sound", "Perfume", "Magazine", "Idea"]),
            new level(["One can be Tamil...", "One can be Ghana...", "One can be of Liberty...", "One can be Kinetic...", "One can be Endotermic...", "One can be Visual..."], ["LAN", "GU", "AGE", "COU", "NT", "RY", "STA", "TUE", "KI", "NE", "TIC", "REA", "CT", "ION", "ART"], ["Language", "Country", "Statue", "Energy", "Reaction", "Art"]),
            new level(["One can ... Guarani", "One can ... 'Hamlet'", "One can ... 'Shazam!'", "One can ... a dream", "One can ... from Diabetes", "One can ... Bangkok"], ["SPE", "AK", "RE", "AD", "WAT", "CH", "AC", "CO", "MP", "LI", "SH", "SUF", "FER", "VI", "SIT"], ["Speak", "Read", "Watch", "Accomplish", "Suffer", "Visit"]),
            new level(["Make a ...", "Make a ...", "Make a ...", "Make a ...", "Make a ...", "Make a ..."], ["WI", "SH", "DIF", "FE", "REN", "CE", "MO", "VE", "DE", "AL", "RE", "SEA", "RCH", "COO", "KIE"], ["Wish", "Difference", "Move", "Deal", "Research", "Cookie"]),
            new level(["Spring thing...", "Summer thing...", "Autumn thing...", "Winter thing...", "Day thing...", "Night thing..."], ["FL", "OW", "ER", "BE", "ACH", "LE", "AV", "ES", "SN", "OW", "LIG", "HT", "DAR", "KN", "ESS"], ["Flower", "Beach", "Leaves", "Snow", "Light", "Darkness"]),
            new level(["Acrophobia - fear of ...", "Coulrophobia - fear of ...", "Arachnophobia - fear of ...", "Batophobia - fear of ...", "Aquaphobia - fear of ...", "Haemophobia - fear of ..."], ["HE", "IG", "HT", "CLO", "WN", "SPI", "DER", "SKY", "SCR", "AP", "ER", "WA", "TER", "BL", "OOD"], ["Height", "Clown", "Spider", "Skyscraper", "Water", "Blood"]),
            new level(["Homo sapiens...", "Chelonia mydas...", "Achaearanea tepidariorum...", "Balaenoptera musculus...", "Ambystoma tigrinum...", "Canis lupus..."], ["HU", "MAN", "TU", "RT", "LE", "SPI", "DER", "WH", "ALE", "SAL", "AM", "AND", "ER", "WO", "LF"], ["Human", "Turtle", "Spider", "Whale", "Salamander", "Wolf"]),
            new level(["Starter...", "Appetizer...", "Main Plate...", "Dessert...", "Beverage...", "Snack..."], ["SO", "UP", "SAL", "AD", "CHI", "CK", "EN", "TIR", "AM", "ISU", "WI", "NE", "NA", "CH", "OS"], ["Soup", "Salad", "Chicken", "Tiramisu", "Wine", "Nachos"]),
            new level(["Super...", "Super...", "Super...", "Super...", "Super...", "Super..."], ["LE", "AG", "UE", "BO", "WL", "PO", "WER", "MAR", "IO", "MA", "RK", "ET", "NA", "TU", "RAL"], ["League", "Bowl", "Power", "Mario", "Market", "Natural"]),
            new level(["Hello...", "Hello...", "Hello...", "Hello...", "Hello...", "Hello..."], ["AD", "ELE", "TA", "LK", "WO", "RLD", "GO", "OG", "LE", "KI", "TTY", "NE", "IG", "HB", "OUR"], ["Adele", "Talk", "World", "Google", "Kitty", "Neighbour"])
        ];
        
        levels = shuffleLevels(levels);
    /****************Executing******************/
        for(var o = 0; o<goon.length; o++) {
            goon[o].onclick = function() {
                if(it >= levels.length) {
                    alert("You managed to prepare every recipe! Congratulations!");
                    firstPage.style.display = "block";
                    playground.style.display =" none";
                    youwon.style.display = "none";
                    it = 0;
                } else {                
                    firstPage.style.display = "none";
                    youwon.style.display = "none";
                    playground.style.display = "block";
                    for(var c = 0; c<8; c++) {
                        puf[c].style.animation = "pls 2s infinite";
                    }
                    pika.style.animation = "ngriu 2s infinite";
                    
                    chosen = levels[it];
                    chosen.addData();
                    chosen.shuffle();
                    chosen.check();                
                    it++;
                    /************HINTS************************/
                    if(!heve) {
                        pot.addEventListener("click", useHint);
                        heve = true;
                    }
                    function useHint() {
                        if(hintLeft <= 0) {
                            alert("No more hints left.\nTry to win a level so you can get some more...");
                            pot.removeEventListener("click", useHint);
                            heve = false;
                        } else {
                            chosen.hintMethod();
                            alert(actual);
                            hintLeft--;
                            hl.innerHTML = hintLeft;
                        }
                    }
                }
            }
        }
    }