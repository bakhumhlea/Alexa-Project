/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.68ce397b-a7a2-41d2-8eb4-8f1d3c8935ba';

const SKILL_NAME = 'Thai Facts';
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
    'Thailand’s name in the Thai language is \"Prathet Thai\", which means Land of the Free (But now in 2018, Not really free). It is the only country in Southeast Asia that was never colonized by a European nation. The term may also refer to an ethnic group from which many Thai people descend',
    'Thailand has had several names over the centuries. For hundreds of years it was known by the names of its dominant cities, such as Sukhothai, Ayutthaya, and Thonburi. Since the 1800s, it has repeatedly switched back and forth between Siam (Sanskrit meaning dark or brown) and Thailand.',
    'Thailand shares a border with four countries: Myanmar (formerly Burma) to the north and west, Laos to the north and east, Cambodia to the southeast, and Malaysia to the south.',
    'Thailand is home to the world’s largest gold Buddha, the largest crocodile farm, the largest restaurant, the longest single-span suspension bridge, and the world’s tallest hotel.',
    'In the past, all Thai young men including the kings became Buddhist monks for at least a short period of time before their 20th birthday. Today, fewer young men observe the practice.',
    'Current Prime Minister of Thailand, well I prefer calling him Junta leader, is \"General Prayuth Chan-Ocha\"',
    'Buddhism is Thailand’s largest religion with approximately 94.6% of the population practicing the religion. Muslims make up 4.6%, Christians 0.7%, and \"other\" 0.1%.',
    'The world’s smallest mammal, the Craseonycteris thonglongyai (the bumble bat), is found in Thailand.',
    'In 1996, two rare \"diamond-eyed cats,\" Phet and Ploy, were married in a lavish $16,241 Thai wedding, the most expensive pet wedding in the world.',
    'In 1999, 30 vets worked to heal a 38-year-old cow elephant’s foot, which had been destroyed when she stepped on a landmine in Thailand. It set the record for the largest number of vets in one procedure. Thailand, Land of a mine(field)',
    'In 1999, a group of 282 skydivers set the record for the largest number of skydivers in a free-fall formation above Ubon Ratchathani, Thailand. They held the link for 7.11 seconds.',
    'Thailand is the world’s 51st largest country.',
    'Thailand is slightly larger than the size of Wyoming at 198,115 square miles (513,115 sq km).',
    'Seventy five percent of the people in Thailand are Thai, 14% are Chinese, and 11% are \'other.\'',
    'The highest elevation in Thailand is \"Mountain Inthanon\" or \"Doi Inthanon\", at 8,514 feet (2,595 m). \"Doi\" means \"Mountain" in Northern Thai dialects',
    'The northern part of Thailand was once a different country, called the Kingdom of Lanna, and Chiang Mai province was a capital city of Lanna',
    'The longest place name in the world is the full name of Bangkok, the capital city of Thailand: Krung-thep-maha-nakhon Amon-rattanakosin Ma-hin-thar-ayut-thaya Maha-dilok-phop Nop-pha-rat-ratcha-tha-ni-burirom Udom-ratcha-niwet-maha-sathan Amon-phiman-awatan-sathit Sakka-that-ti-ya-wit-sanuk-am-prasit',
    'A century ago, northern Thailand was covered with dense hardwood forests. Today only about one-fourth of the country remains wooded. Thailand has the second-highest rate of forest loss in Southeast Asia. Only Singapore has lost more. Today, logging is banned in Thailand. That\'s so sad.',
    'Thailand’s national language is called Thai, which many scholars believe is a form of Chinese that was gradually brought to the area between the 7th and 13th centuries. Like Lao, Vietnamese, and Chinese, Thai is a very tonal language. Its alphabet has 32 vowels and 44 consonants.',
    'Bangkok was once called the “Venice of the East” because its original buildings stood on stilts above the Chao Phraya River. However, as Bangkok grew larger, most canals were filled and paved.',
    'Prostitution is technically illegal in Thailand, but the law is very rarely enforced. Estimates of the number of sex workers vary from 30,000 to more than 1 million. Just Wow!',
    'Both the Hollywood movie and Broadway play of The King and I are banned in Thailand. Based on the Siamese ruler King Mongkut and a teacher named Anna Leonowens, the movie is seen as insulting to the king. While the movie depicts him as uncultured, he is believed to be the first Asian ruler to speak, read, and write English fluently. He also is considered highly intelligent, cultured, and well read. Further, he is known as the father of Thai scientists.',
    'Thailand’s lese-majeste law, which forbids the insult of the monarchy, is among the strictest in the world.',
    'Be careful of what you will say. Article 112 of Thailand’s criminal code says anyone who \"defames, insults or threatens the king, the queen, the heir-apparent or the regent\" will be punished with a jail term between three and 15 years.',
    'The UN’s High Commissioner for Human Rights says the number of people investigated for lese-majeste has risen to more than double the number investigated in the previous 12 years. Only 4% of those charged in 2016 were acquitted.',
    'People have been arrested for lese-majeste over online activity, such as posting images on Facebook of the late King Bhumibol’s favourite dog, and clicking the \'like\' button on Facebook on posts deemed offensive.',
    'The 2004 tsunami hurtled a wall of water 30 feet high over Thailand’s coast, killing over 8,000 people. An estimated 1,500 Thai children lost their parents and more than 150,000 Thais working in the fishing or tourist industries lost their livelihoods.',
    'Northern Thailand was a major producer of opium in the 1960s and 1970s, which was a major source of income for the hill tribes. The northern tip of Thailand, the western tip of Laos, and the eastern corner of Myanmar make up what is called the \"Golden Triangle\" and is notorious for the production and trafficking of opium and heroin.',
    'Just as the bald eagle is a symbol of the U.S., the Garuda (a creature from the Hindu religion) is a national and royal symbol of Thailand.',
    'The brothers who gave the world the term \"Siamese twins\" were born in 1811 in a village near Bangkok. The twins Eng and Chang were joined at the chest and left Thailand for the U.S when they were 17 years old. Each brother married, and between them they had 22 children. In 1873, Eng caught pneumonia and died. Chang died a few hours later.',
    'One in 10 Thais live in Bangkok, the nation’s capital and largest city. Chiang Mai is the second largest',
    'My name \"Ping\" is named after river located in Northern Thailand. Ping river is one of the two main tributaries of the Chao Phraya River. It originates at \"Doi Thuai\" in the Daen Lao Range in Chiang Dao district, Chiang Mai Province.',
    'Thailand has a reputation for sexual tolerance and is considered very safe for LGBT travelers. Transsexuals, also known as krathoeys or ladyboys, are highly visible in mainstream society.',
    'Thailand has one of the worst child sex trafficking records in the world. This is horrible!',
    'In Thailand, the head is the most important part of the body. Consequently, no one must ever touch another person, even a child, on the head. Thais always try to keep their heads lower than the head of any person who is older or more important, to show respect.',
    'In 2018, The population of Thailand is 69,183,173, which is ranked 20th in the world. The ranking takes into account the effects of excess mortality due to AIDS.',
    'Traditionally in Thailand, feet are considered lowly because they symbolize an attachment to the ground, which is a cause for human suffering. As such, a person must never sit with their feet pointing to a statue in a temple or at some other person. Feet must always be tucked underneath the body.',
    'The Thai language has 44 consonants and 32 vowels',
    '‘Soi’ means ‘street’ or ‘alley’',
    'Though the name of the country means “free,” on May 22nd 2014, the Royal Thai Armed Forces organized a coup and overthrew the government. It was the 12th coup since the first one occurred in 1932. We like to collonize ourself.',
    'The king’s anthem is played before any cultural performance, even before Hollywood movies at modern multiplexes.',
    'Thailand is the land of white elephants, but don’t expect to see white elephants roaming around, literally. White is just a color used to signify Thailand’s purity. The elephant, though, happens to be Thailand’s national animal.',
    'Thailand likes to have its beer on the rocks because of its hot weather. Most of the people in Thailand drink beer mixed with nam keng, which means “ice.”',
    'Sato, the local alcohol, is made from starchy rice and is sipped with a straw.',
    'The king of tropical fruits, Durian, is native to Thailand, but banned in most hotels for its pungent smell.',
    'Muay Thai is the national sport of Thailand. Often deadly, it is known as “The art of eight limbs.” The knees, elbows, shins and hands are each treated as a separate set of limbs.',
    'Thailand is the prostitution capital of the world, and is notoriously famous for its red-light districts. Honestly, I\'m not proud of.',
    'Buddhists believe Buddha was an elephant before he took on a human form. An elephant tattoo is a powerful thing to have, so consider getting one if you’re in Thailand.',
    'Thailand has more than 40,000 temples. Don’t worry, no one has ever been able to visit them all.',
    'Thailand doesn’t have a climate conducive for wine making, but the Hua Hin Hills Vineyard south of Bangkok is one place you can enjoy the scenery while you sip Monsoon Valley wine.',
    'Visit the island of Ko Pha-Ngan for secret full-moon parties.',
    'James Bond and Thailand seem to be inseparable. The Man With the Golden Gun and Tomorrow Never Dies feature Bond and Thailand.',
    'Total area of Thailand is 513,120 sq.km.'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
