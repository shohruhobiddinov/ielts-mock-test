import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReadingTest = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(60 * 60);
    const [currentPart, setCurrentPart] = useState(1);
    const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem("readingAnswers") || "{}"));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/writing");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const handleChange = (qNum, value) => {
        const newAnswers = { ...answers, [qNum]: value };
        setAnswers(newAnswers);
        localStorage.setItem("readingAnswers", JSON.stringify(newAnswers));
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col text-lg h-[100vh]">
            {/* Navbar */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 fixed top-0 left-0 right-0 bg-white z-10">
                <h1 className="font-bold text-xl md:text-2xl">Reading Test</h1>
                <div className="font-semibold">{formatTime(timeLeft)}</div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 gap-6 p-4 pt-24 pb-20 overflow-hidden">
                {/* Left: Text */}
                <div className="flex-1 overflow-auto border border-gray-300 rounded-lg p-4 max-h-[calc(100vh-8rem)]">
                    {currentPart === 1 && (
                        <div>
                            <h2 className="font-bold mb-4 text-xl">Bodie: America's most famous ghost town</h2>
                            <p className={"my-3"}>
                                If you peek inside one of the broken-down buildings in Bodie, California, you might see
                                dust-covered furniture with an old muffin pan, rusty tins, and broken kerosene lamps or
                                a fully stocked general store with original wooden boxes and shelves with tin cans.
                                Situated in a sagebrush-covered valley in the eastern foothills of the Sierra Nevada
                                mountain range, the old gold-mining town, once busy with life, began in the 1870s, when
                                prospective miners arrived in the town in hopes of finding gold and becoming wealthy. By
                                the 1940s, the gold was gone and the last mine closed. Today, not many structures remain
                                in Bodie; there is about 20 percent of the number that stood in the 1870s, when the town
                                had up to 8,000 inhabitants.
                            </p>
                            <p className={"my-3"}>
                                In the 1870s, thirty mines were built and began producing large pieces of gold in large quantities. The Standard Company was one of the first factories in America to extract the remaining traces of gold using electricity. Chemical processing was done in two stages. In the first stage, workers washed ground-up ore over copper sheets covered with gold-grabbing mercury, then they heated it to release and condense the mercury, and turned the melted mixture into the shape of golf bars. In a second stage devised to obtain any remaining gold and silver particles, the ore, now the consistency of sand, was soaked in watered-down potassium cyanide. This drew the metals out into a form that could be trapped by trays containing small pieces of zinc. This process went on for about 70 years, until the gold mines dried up.
                            </p>
                            <p className={"my-3"}>
                                When the California State Parks Department took over Bodie in 1962, it began a program of "arrested decay," maintaining the run-down structures just as they appeared at the time the department acquired the town.
                            </p>
                            <p className={"my-3"}>
                                According to Charley Spiller, a Bodie maintenance mechanic, the greatest enemies of preservation are wind, which can gust up to 100 miles an hour on nearby mountains, and snow, which averages 13 feet a year. When snow gets into a building and sits and... into the floors, the condition of the floors gets worse, and they often rot. Currently, a team of three or four workers spends six months of each year strengthening walls, repairing roofs, and replacing smashed windows. Spiller and his team rebuild walls using pine similar to the native Jeffrey pine that was originally used without constant attention, most houses would fall apart. Nearby towns similar to Bodie have already disappeared because, for one reason or another, they weren't maintained.
                            </p>
                            <p className={"my-3"}>
                                While the staff work to preserve the site's empty look, a variety of natural life lives on in the remains of the town. California ground squirrels tunnel into the shrub-covered earth, feeding on meadow grass and bitterbrush. Coyotes—and from time to time a mountain lion, bobcat, or bear—amble through the town. As people left their homes in Bodie and no one else moved in, the houses became popular havens for species that thrive in the empty places, such as deer, mice, snakes, and lizards. Trillions of microbes, life forms invisible to the human eye, also live in the soil, some of which can consume the toxic mercury and cyanide by-products of mining. One microbial ecologist found that deserts, like the one in Bodie, contain up to twice as many bacterial species, roughly 10,000 per 10 square meters, as do acidic rainforest soils. The deserts of the American West, where thousands of ghost towns stand, are therefore surprisingly full of life.
                            </p>
                            <p className={"my-3"}>
                                It is the life that left Bodie, however, that most interests the tourists who visit. Ghost towns like Bodie, cultural geographer Dydia DeLyser explains, are a powerful draw because they are perceived as authentic—actual abandoned towns presented more or less as they were left, and therefore as they once were. DeLyser says that visitors examine their originality, asking questions like, "Was all this stuff really just left here?" Or "Was it all set up to make it look like a ghost town?" If it would be a mistake, DeLyser says, for anyone to think that the plates on the table or other items at Bodie were left behind in a rush to escape.
                            </p>
                        </div>
                    )}
                    {currentPart === 2 && (
                        <div>
                            <h2 className="font-bold mb-4 text-xl">Boring buildings</h2>
                            <p className="my-3">
                                There could be more than an economic or nostalgic price to impersonal retail and
                                high-rise construction; boring architecture may take an emotional toll on the people
                                forced to live with it.
                            </p>
                            <p className="my-3"><strong>A</strong> A growing body of research in cognitive science
                                illuminates the physical and mental toll bland cityscapes take on residents. Generally,
                                these researchers argue that humans are healthier when they live surrounded by variety
                                or work in well-designed, unique spaces, rather than unattractive generic ones. Urban
                                policy professor Justin Hollander and architect Ann Sussman review scientific data to
                                help architects and urban planners understand how, exactly, people respond to their
                                built surroundings, particularly at work. People, they argue, function best in intricate
                                settings, not big, blank, boxy offices.</p>
                            <p className="my-3"><strong>B</strong> Indeed, that's what Colin Ellard, a neuroscientist at
                                the University of Waterloo in Canada, has found in his work. Five years ago, Ellard
                                became interested in a certain building—the gigantic Whole Foods Market ‘plopped into’ a
                                notoriously textured part of lower Manhattan in New York. Ellard partnered with the
                                Guggenheim Museum to analyze what happens when someone walks out of a tiny neighborhood
                                restaurant and encounters a full city block with nothing but the long, blank façade of
                                the Whole Foods Market building. In 2011, Ellard led small groups on Lower East Side
                                walks to measure the effect of the urban environment on them. Participants recorded
                                their response to questions at each stopping point and wore sensors that measured skin
                                conductance, a response to emotional excitement. Passing the monolithic Whole Foods
                                Market, people's state of arousal plummeted. Physiologically, Ellard explained, they
                                were bored. To describe this place, they used words like 'bland' and 'passionless.' In
                                contrast, one block east at the other test site—a lively sea of restaurants with lots of
                                open doors and windows—people measured high levels of excitement, and they listed words
                                like 'lively' and 'socializing.' Ellard explains that the main objective of urban design
                                should be to produce some kind of novelty or change every few seconds; otherwise, we
                                become cognitively disengaged.</p>
                            <p className="my-3"><strong>C</strong> The trick, it seems, is to design a world that
                                excites but doesn't overload our senses with a constant barrage of information. “We are,
                                as animals, programmed to respond to thrill,” said professor Brendan Walker. In Walker's
                                ‘Thrill Laboratory’ at the University of Nottingham in the UK, devices measure heart
                                rate and skin conductance to see how people respond to adrenaline-producing experiences
                                such as a roller-coaster ride. A thrilling encounter moves us quickly from a state of
                                equilibrium to a desirable ‘disorientation.’ “Humans want a certain element of turmoil
                                or confusion,” he said. “Complexity is thrilling whether in an amusement park or
                                architecture.”</p>
                            <p className="my-3"><strong>D</strong> Psychologists have found that awe-inspiring moments
                                can potentially improve our well-being. One study conducted by Melanie Rudd, Kathleen
                                Vohs, and Jennifer Aaker of Stanford University in the US showed that the feeling of
                                'awe' can make people more patient and less materialistic. In an experiment, the
                                researchers showed students 60-second clips of waterfalls, whales, or astronauts in
                                space. After only a minute of virtual images, those who said they were awed also felt
                                less pressed for time. And in another variation, people made hypothetical choices
                                between physical and experiential goods of equal monetary value. Those who had just felt
                                awe were more likely to choose an experience over a possession, a choice that is linked
                                with greater satisfaction in the long run. In other words, awe might have the ability to
                                change our frame of mind, making modern life more satisfying and interactive.</p>
                            <p className="my-3"><strong>E</strong> It’s important to note, however, that architectural
                                boredom isn’t about how pristine a street is. People often confuse successful
                                architecture with whether an area looks pleasant. On the contrary, when it comes to city
                                buildings, people often focus too narrowly on aesthetics, said Charles Montgomery,
                                author of Happy City: Transforming Our Lives Through Urban Design. Some of the happiest
                                blocks in New York City, he argues, are kind of ugly and messy. In 2014, Montgomery's
                                Happy City lab conducted an experiment in which he found a strong correlation between
                                messier blocks and pro-social behavior. Montgomery sent researchers, posing as lost
                                tourists, to places he coded as either 'active' or 'inactive' facades. He concluded that
                                the former had a high level of interest, that is, they were messy, while the latter had
                                no special features such as long warehouse blocks. Pedestrians at active sites were
                                nearly five times more likely to offer assistance than at inactive ones. Of those who
                                assisted, seven times as many at the active site offered the use of their phone.</p>
                            <p className="my-3"><strong>F</strong> Fortunately, it’s not necessarily a dichotomy—new
                                architecture can achieve the optimal level of cacophony and beauty. Take the 2006 Hearst
                                Tower in midtown Manhattan. Designed by architect Norman Foster, Hearst Tower is a
                                glass-and-steel skyscraper, 40 stories of which are designed in a triangular pattern,
                                differing in style from the 1920s base. The building's facade has a striking impact on
                                commuters and employees. Some may find the design confusing, as it mixes old and new
                                elements. Inside the tower, elevators carry employees up past a large water sculpture in
                                the light-filled lobby.</p>
                        </div>
                    )}
                    {currentPart === 3 && (
                        <div>
                            <h2 className="font-bold mb-4">Neanderthal Technology</h2>
                            <p className={"my-3"}>
                                <strong>A</strong> We think of our prehistoric ancestors as people of the ice and snow, living in caves, and for many of the west European Neanderthalers that is a just picture of their life. But where there were no caves, further to the east on the Russian steppe, for example, open-air sites with some sort of constructed shelter were the only option. We now know much more about the cave sites than the open-air ones because, historically, it was the cave sites of Western Europe that were first explored by archaeologists and also because open-air sites are harder to find – many of them have disappeared under deep mud deposits or under the rising postglacial seas. Caves, moreover, aid the survival of archaeological material and can preserve the records of remote millennia.
                            </p>
                            <p className={"my-3"}>
                                <strong>B</strong> In south-west France, the limestone caves of the Périgord region made ideal homes for the Neanderthal people. There were good supplies of flint to hand for axes and the like, and the caves were often sited in small river valleys that offered protection against the worst of the weather. The Neanderthalers liked south-facing caves, for obvious reasons of sunshine and wind avoidance, and caves at some height above the valley floor offered refuge from floods and good game-watching vantage points. The Périgord region during the last ice age was, in fact, an exceptionally benign habitat for humans. It enjoyed a rather maritime climate with cooler summers that permitted the extension of tundra and steppe over its higher plateaux, and its year-round high levels of sunshine favoured the growth of the ground plants needed by reindeer, bison and horse. Winters were mildish for the ice age, animals never needed to migrate far from summer to winter, and men never needed to travel far from home to find abundant supplies of meat.
                            </p>
                            <p className={"my-3"}>
                                <strong>C</strong> In Central and Eastern Europe, where caves were unavailable, such open-air sites as have been discovered were mostly located near water – both because this was a good area to be for people and animals, and also because the sedimentation potential of lakes and stream courses has aided archaeological preservation – whereas erosion has presumably blown away sites which were out in the open. Some of the open-air sites in Germany, Central Europe and Russia have provided valuable information about Neanderthal man and his way of life. From Moldova, for example, comes evidence that has been interpreted as the remains of wind-break structures, or even a large tent: a ring, up to about 8 x 5m in size, of mainly mammoth bones enclosing a dense concentration of stone tools, animal bones and ash.
                            </p>
                            <p className={"my-3"}>
                                <strong>D</strong> From the west European caves more evidence of built structures is available, and some of it goes back a long way in time. In the Grotte du Lazaret, near Nice, at a date during the last ice age but one, claims for some sort of skin tent within the cave have been advanced, on the basis of arrangements of large stones out from the cave wall that might have supported timber struts for a covering of skins up to the rock face above. At Lazaret, what might be openings in the hypothesised tents seem to point away from the cave mouth, and finds of wolf and fox foot bones, without the rest of the skeletons, inside these ‘tents’ have been thought to indicate the use of animal pelts as bed coverings. The two patches of ash at Lazaret that mark ancient fires, with stone tools around them evidently made and used on the spot, are edged with small marine mollusc shells, prompting the excavator to suggest that seaweed had been used as bedding around the fires. The cave of Baume-Bonne in the Basses-Alpes region of France, another early site, boasts ten square metres of cobbles brought up from the local river and laid down, as though to take care of a puddle area in the cave, with the smoothest and roundest surfaces of the stones uppermost, and there are other similar cases.
                            </p>
                            <p className={"my-3"}>
                                <strong>E</strong> The ash encountered in concentrations at some sites testifies to the Neanderthal people’s use of fire: not surprising, since use of fire was, by Neanderthal times, an already ancient accomplishment of evolving humanity, and survival in the sub-arctic conditions faced by the Neanderthalers is inconceivable without control of fire. Fire gave warmth, light, heat for cooking and defence against predatory animals. A charred piece of birch from Krapina in Croatia, is thought to be the remains of a fire-making twirl stick. But Neanderthal hearths, in the sense of specially constructed places for fire, are fewer and harder to identify with certainty than the mere ash piles that are a regular feature of their sites. They seem often to have just lit a small fire (40-50cm across) on the existing ground surface of the cave, without preparation. Judging from the shallow penetration of heat effects under the ash, this fire was only of a short duration. Sometimes the fires were larger in size, up to one metre across, and quite irregular in shape. It is not always easy to to decide how much additional structure some fires possessed: claims of stone circles to contain the fire run up against the fact that stones tend to litter the cave floors everywhere and those around a fire can quite accidentally look as though they were arranged in a circle.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Questions */}
                <div
                    className="flex-1 flex flex-col overflow-auto border border-gray-300 rounded-lg p-4 max-h-[calc(100vh-8rem)]">
                    {currentPart === 1 && (
                        <div>
                            <h3 className="font-bold mb-4 text-xl">Questions 1–7</h3>
                            <p>Complete the notes below. </p>

                            <p>Choose ONE WORD AND/OR A NUMBER from the passage for each answer.</p>
                            <p>Write your answers in boxes 1–7 on your answer sheet.</p>

                            <div className="my-4">
                                <p className={"font-bold"}>Bodie’s past</p>
                                <p className={"font-bold"}>About Bodie</p>
                                <div className={"flex items-center my-2"}>
                                    <p className="font-semibold">- Located in a</p>
                                    <input
                                        type="text"
                                        value={answers["1"] || ""}
                                        onChange={e => handleChange("1", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"1"}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className={"flex items-center my-2"}>
                                    <p className="font-semibold">- In the 1870s attracted people who wanted to be</p>
                                    <input
                                        type="text"
                                        value={answers["2"] || ""}
                                        onChange={e => handleChange("2", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"2"}
                                    />
                                </div>
                            </div>
                            <p className={"font-semibold mb-4"}>- Saw the end of gold production in the 1940s.</p>

                            <div className="mb-4 font-semibold">
                                <div className={"flex items-center my-2"}>
                                    <label>- Now has about</label>
                                    <input
                                        type="text"
                                        value={answers["3"] || ""}
                                        onChange={e => handleChange("3", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"3"}
                                    />
                                    <p>of the original buildings.</p>
                                </div>
                            </div>

                            <h3 className={"font-bold my-4"}>Gold mining and milling</h3>
                            <p className={"font-semibold"}>- Large-scale production of gold</p>

                            <div className="mb-4">
                                <div className={"flex items-center my-2"}>
                                    <label className="font-semibold">- Extraction of smaller amounts of gold
                                        required</label>
                                    <input
                                        type="text"
                                        value={answers["4"] || ""}
                                        onChange={e => handleChange("4", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"4"}
                                    />
                                </div>
                            </div>

                            <p className={"font-semibold mb-4"}>- Extraction by chemical processing involved:</p>
                            <p className={"font-semibold mb-4"}>- First stage:</p>

                            <div className="mb-4">
                                <div className={"flex items-center my-2"}>
                                    <label className="font-semibold">- Ore was rinsed over mercury-covered sheets
                                        of</label>
                                    <input
                                        type="text"
                                        value={answers["5"] || ""}
                                        onChange={e => handleChange("5", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"5"}
                                    />
                                </div>
                            </div>

                            <p className={"font-semibold mb-4"}>- Melted mixture was formed into bars:</p>
                            <p className={"font-semibold mb-4"}>- Second stage (to filter any leftover gold or silver
                                particles):</p>

                            <div className="mb-4 font-semibold">
                                <div className={"flex items-center my-2"}>
                                    <p className="">- Ore with texture like</p>
                                    <input
                                        type="text"
                                        value={answers["6"] || ""}
                                        onChange={e => handleChange("6", e.target.value)}
                                        className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                        placeholder={"6"}
                                    />
                                    <p>was immersed in potassium cyanide.</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="font-semibold">- Metals were taken out and caught in containers
                                    filled with</label>
                                <input
                                    type="text"
                                    value={answers["7"] || ""}
                                    onChange={e => handleChange("7", e.target.value)}
                                    className="w-[150px] h-[30px] mt-1 mx-2 p-2 border rounded-lg text-center"
                                    placeholder={"7"}
                                />
                            </div>


                            {/* Questions 8–13 (True/False/Not Given) */}
                            <div className="mt-6">
                                <h3 className="font-bold mb-4">Questions 8–13</h3>

                                <p>Do the following statements agree with the information given in Reading Passage
                                    1?</p>
                                <p>In boxes 8–13 on your answer sheet, write</p>
                                <p><strong>TRUE</strong> if the statement agrees with the information</p>
                                <p><strong>FALSE</strong> if the statement contradicts the information</p>
                                <p><strong>NOT GIVEN</strong> if there is no information on this.</p>

                                <div className="my-4">
                                    <p className="font-semibold">8. Wind and snow are the most difficult factors Bodie
                                        preservationists have to deal with</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="8"
                                                value={option}
                                                checked={answers["8"] === option}
                                                onChange={e => handleChange("8", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">9. The maintenance team in Bodie was unable to locate
                                        the Jeffrey pine the settlers used</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="9"
                                                value={option}
                                                checked={answers["9"] === option}
                                                onChange={e => handleChange("9", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">10. Lack of funding has caused other towns like Bodie
                                        to disappear.</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="10"
                                                value={option}
                                                checked={answers["10"] === option}
                                                onChange={e => handleChange("10", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">11. Many people left Bodie when wild animals started
                                        living in their homes.</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="11"
                                                value={option}
                                                checked={answers["11"] === option}
                                                onChange={e => handleChange("11", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">12. Acidic rainforest soils tend to contain more
                                        microbes than the soil found in places like Bodie.</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="12"
                                                value={option}
                                                checked={answers["12"] === option}
                                                onChange={e => handleChange("12", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>

                                <div className="mb-4">
                                    <p className="font-semibold">13. Some tourists doubt that items in Bodie were really
                                        used by people who lived there.</p>
                                    {["TRUE", "FALSE", "NOT GIVEN"].map(option => (
                                        <label key={option} className="block">
                                            <input
                                                type="radio"
                                                name="13"
                                                value={option}
                                                checked={answers["13"] === option}
                                                onChange={e => handleChange("13", e.target.value)}
                                                className="mr-2"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}

                    {currentPart === 2 && (
                        <div
                            className="flex-1 flex flex-col overflow-auto border border-gray-300 rounded-lg p-4 max-h-[calc(100vh-8rem)]">
                            <h3 className="font-bold mb-4 text-xl">Questions 14–26</h3>

                            {/* Questions 14-18: Which section (using <select>) */}
                            <p className="font-semibold mb-2">Questions 14–18: Which section contains the following information?</p>
                            {[
                                { q: "a description of a building that has a positive effect", name: "14" },
                                { q: "a reference to architecture affecting performance in their jobs", name: "15" },
                                { q: "examples of the intensity of reactions in two urban settings", name: "16" },
                                { q: "details of a study where seeing certain pictures reduced stress", name: "17" },
                                { q: "a claim about feelings experienced in response to both architecture and leisure settings", name: "18" },
                            ].map(item => (
                                <div key={item.name} className="mb-4">
                                    <p className="font-semibold">{item.name}. {item.q}</p>
                                    <select
                                        value={answers[item.name] || ""}
                                        onChange={e => handleChange(item.name, e.target.value)}
                                        className="w-[100px] h-[40px] mt-1 p-2 border rounded-lg"
                                    >
                                        <option value="">Select</option>
                                        {["A", "B", "C", "D", "E", "F"].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {/* Questions 19-23: Match researcher (using <select>) */}
                            <p className="font-semibold mb-2">Questions 19–23: Match each statement with the correct researcher, A–D</p>
                            {[
                                { q: "The aim of good city planning is to provide variety in architecture.", name: "19" },
                                { q: "People in untidy areas were more helpful.", name: "20" },
                                { q: "People who had recently felt amazed, placed less importance on material goods.", name: "21" },
                                { q: "Clean places are not necessarily the most enjoyable places to be.", name: "22" },
                                { q: "One particular building failed to provide visual stimulation.", name: "23" },
                            ].map(item => (
                                <div key={item.name} className="mb-4">
                                    <p className="font-semibold">{item.name}. {item.q}</p>
                                    <select
                                        value={answers[item.name] || ""}
                                        onChange={e => handleChange(item.name, e.target.value)}
                                        className="w-[100px] h-[40px] mt-1 p-2 border rounded-lg"
                                    >
                                        <option value="">Select</option>
                                        {["A", "B", "C", "D"].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {/* Questions 24-26: Summary completion */}
                            <p className="font-semibold mb-2">Questions 24–26: Complete the summary below (ONE WORD
                                ONLY)</p>
                            <p className="mb-2">Hearst Tower: Norman Foster’s Hearst Tower was built in 2006. The modern
                                patterned building is made of glass and steel, contrasting with the base which is in the
                                style of the 1920s. The sight of the building’s
                                <input
                                    type="text"
                                    value={answers["24"] || ""}
                                    onChange={e => handleChange("24", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="24"
                                />
                                has a striking impact on commuters and employees. Some may find the design confusing, as
                                it mixes old and new elements. Inside the tower
                                <input
                                    type="text"
                                    value={answers["25"] || ""}
                                    onChange={e => handleChange("25", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="25"
                                />
                                carry employees up past a large water sculpture in the
                                <input
                                    type="text"
                                    value={answers["26"] || ""}
                                    onChange={e => handleChange("26", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="26"
                                />
                                .
                            </p>
                        </div>
                    )}

                    {currentPart === 3 && (
                        <div>
                            <h3 className="font-bold mb-4 text-xl">Questions 27–31</h3>
                            <p className="font-semibold mb-2">
                                Reading Passage 3 has five sections, A–E. Choose the correct heading for each section
                                from the list below.
                            </p>
                            <p className="mb-2">
                                i Evidence of outdoor dwellings<br/>
                                ii Learning to make fire<br/>
                                iii A perfect place to live<br/>
                                iv Examining the cave contents<br/>
                                v Contrasting two types of home<br/>
                                vi A vital source of power
                            </p>
                            {[
                                {q: "Section A", name: "27"},
                                {q: "Section B", name: "28"},
                                {q: "Section C", name: "29"},
                                {q: "Section D", name: "30"},
                                {q: "Section E", name: "31"},
                            ].map(item => (
                                <div key={item.name} className="mb-4">
                                    <p className="font-semibold">{item.name}. {item.q}</p>
                                    <select
                                        value={answers[item.name] || ""}
                                        onChange={e => handleChange(item.name, e.target.value)}
                                        className="w-[250px] h-[40px] mt-1 p-2 border rounded-lg"
                                    >
                                        <option value="">Select</option>
                                        {[
                                            "i ",
                                            "ii ",
                                            "iii ",
                                            "iv ",
                                            "v ",
                                            "vi "
                                        ].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <h3 className="font-bold mb-4 text-xl">Questions 32–36</h3>

                            <p className={"my-2"}>Look at the following findings (Questions 32-36) and the list of
                                places below.</p>
                            <p className={"my-2"}>Match each finding with the correct place A-E.</p>
                            <p className={"my-2"}> Write the correct letter, A-E, in boxes 32-36 on your answer
                                sheet.</p>
                            <p className={"my-2"}><strong>NB</strong> You may use any letter more than once.</p>
                            <p className={"my-2"}>List of Places</p>
                            <p className={"my-2"}>A The Périgord region</p>
                            <p className={"my-2"}>B Moldova</p>
                            <p className={"my-2"}>C The Grotte du Lazaret</p>
                            <p className={"my-2"}>D The cave of Baume-Bonne</p>
                            <p className={"my-2"}>E Krapina</p>


                            {[
                                {q: "a burnt piece of wood", name: "32"},
                                {q: "evidence of efforts to prevent pools of water forming", name: "33"},
                                {q: "the remains of sea creatures", name: "34"},
                                {q: "a circular arrangement of animal bones", name: "35"},
                                {q: "evidence suggesting the use of animal fur for warmth", name: "36"},
                            ].map(item => (
                                <div key={item.name} className="mb-4">
                                    <p className="font-semibold">{item.name}. {item.q}</p>
                                    <select
                                        value={answers[item.name] || ""}
                                        onChange={e => handleChange(item.name, e.target.value)}
                                        className="w-[150px] h-[40px] mt-1 p-2 border rounded-lg"
                                    >
                                        <option value="">Select</option>
                                        {["A", "B", "C", "D", "E"].map(option => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            <h3 className="font-bold mb-4 text-xl">Questions 37–39</h3>
                            <p className="font-semibold mb-2">Complete the summary below (NO MORE THAN TWO WORDS)</p>
                            <p className="mb-2">
                                37 Neanderthalers could not have survived without fire because the conditions they lived
                                in were
                                <input
                                    type="text"
                                    value={answers["37"] || ""}
                                    onChange={e => handleChange("37", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="37"
                                />.
                            </p>
                            <p className="mb-2">
                                38 Most evidence of purpose-built fires takes the form of ash piles, features of which
                                suggest that the fires lasted a
                                <input
                                    type="text"
                                    value={answers["38"] || ""}
                                    onChange={e => handleChange("38", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="38"
                                /> time.
                            </p>
                            <p className="mb-2">
                                39 It is hard to be certain about the size and structure of the fires, though they were
                                certainly needed to protect the occupants from dangerous
                                <input
                                    type="text"
                                    value={answers["39"] || ""}
                                    onChange={e => handleChange("39", e.target.value)}
                                    className="w-[150px] h-[30px] mx-2 p-2 border rounded-lg text-center"
                                    placeholder="39"
                                />, among other things.
                            </p>

                            <h3 className="font-bold mb-4 text-xl">Question 40</h3>
                            <p className={"my-3"}>Choose the correct letter, <strong>A, B, C</strong> or <strong>D</strong>.</p>
                            <p className={"my-3"}>Write the correct letter in box 40 on your answer sheet.</p>
                            <p className={"my-3"}>The purpose of the writer of this article is to</p>

                            {["A argue that Neanderthal homes were bigger than originally thought.", "B explain why Neanderthal people migrated to Western Europe.", "C discuss what is known about Neanderthal settlements.", "D track the progress of early Neanderthal development."].map(option => (
                                <label key={option} className="block mb-1">
                                    <input
                                        type="radio"
                                        name="40"
                                        value={option}
                                        checked={answers["40"] === option}
                                        onChange={e => handleChange("40", e.target.value)}
                                        className="mr-2"
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div
                className="flex justify-center gap-4 p-4 border-t border-gray-300 fixed bottom-0 left-0 right-0 bg-white z-10">
                {[1, 2, 3].map(part => (
                    <button
                        key={part}
                        onClick={() => setCurrentPart(part)}
                        className={`px-6 py-2 border rounded-lg font-bold ${
                            currentPart === part ? "bg-black text-white" : "bg-white text-black border-black"
                        }`}
                    >
                        Part {part}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReadingTest;
