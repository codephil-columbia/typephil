const chapters = [
  {
    chapterID: 1,
    chapterName: "Chapter 0: The Basics", 
    chapterDescription: 'In this chapter, you will learn the importance of touch typing as well as proper posture while using the keyboard. You will also encounter the entire finger map of the keyboard, which will serve as your guidelines for the rest of the tutorial.', 
    nextChapterID: 2,
    chapterImage: "images/chapters/chapter0.svg"
  },
  {
    chapterID: 2, 
    chapterName: 'Chapter 1: Home Row', 
    chapterDescription: 'In this chapter, you will learn how to use the home row, which is located on the center of the keyboard. Home row is where you will start your typing journey.', 
    nextChapterID: 3,
    chapterImage: "images/chapters/chapter1.svg"
  }, 
  {
    chapterID: 3, 
    chapterName: 'Chapter 2: Shift and Basic Punctuations', 
    chapterDescription: "In this chapter, you will learn how to use the 'Shift' keys, which are located on both sides of the keyboard. The ‘Shift’ keys will allow you to access common punctuations.", 
    nextChapterID: 4,
    chapterImage: "images/chapters/chapter2.svg"
  },
  {
    chapterID: 4, 
    chapterName: "Chapter 3: Top Row",
    chapterDescription: "In this chapter, you will learn how to use the top row, which is located above the home row. Mastering the top row allows you to access all English vowels.", 
    nextChapterID: 5,
    chapterImage: "images/chapters/chapter3.svg"
  },
  {
    chapterID: 5, 
    chapterName: "Chapter 4: Bottom Row", 
    chapterDescription: "In this chapter, you will learn how to use the bottom row, which is located below the home row. You have already encountered some of the bottom row keys in Chapter 2, but this chapter will complete your understanding of the bottom row.", 
    nextChapterID: 6,
    chapterImage: "images/chapters/chapter4.svg"
  }, 
  {
    chapterID: 6, 
    chapterName: "Chapter 5: Number Row", 
    chapterDescription: "In this chapter, you will learn how to use the number row. The number row is important for performing math operations. This chapter will complete your keyboard knowledge.", 
    nextChapterID: 7,
    chapterImage: "images/chapters/chapter5.svg"
  }, 
  {
    chapterID: 7, 
    chapterName: "Chapter 6: Advanced Content", 
    chapterDescription: "The final chapter of the tutorial will include advanced training exercises. This will bring your WPM and accuracy to the next level, by providing practices through common words, sentences, and paragraphs.", 
    nextChapterID: null,
    chapterImage: "images/chapters/chapter6.svg"
  }
]

const lessons = [
    {
        "lessonName": "Lesson 1: The Importance of Touch Typing",
        "lessonText": ["Typing faster with better accuracy will help you increase your productivity.", "In this tutorial, you will learn how to touch type. Touch typing is typing without looking at the keyboard to find the keys. If you master touch typing, you will remember the location of keys on the keyboard through muscle memory.", "Touch typing will allow you to type faster with accuracy, increase productivity, and decrease fatigue. Typing can be difficult mentally and physically without touch typing. But learning how to touch type can make typing more enjoyable!"],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["","",""],
        "lessonID": 1,
        "nextLessonID": 2,
        "chapterID": 1
    },
    {
        "lessonName": "Lesson 2: Metrics For Calculating Improvement",
        "lessonText": ["How do you know if your typing skills are improving? There are ways to calculate both typing speed and accuracy. In this lesson, you will be introduced to words per minute (WPM) and accuracy.", "Words per minute (WPM) is the number of words you type per minute. The higher your WPM, the faster you are at typing.", "The faster you type, the faster you can communicate with others. You can maximize your time sending an email, researching on the internet, writing project proposals, and more.", "An average person types between 38 and 40 WPM. However, a professional typist can type a lot faster, between 65 and 75 WPM. The record of the fastest English language typist is 216 WPM! Do you think you can beat that?", "Accuracy is the percentage of letters you type that are correct. For example, if you type ‘A’ when you are supposed to type ‘B,’ your accuracy score will decrease.", "Try to keep your average accuracy above 92%! This means you make 8 mistakes for every 100 words typed.", "We will display WPM and accuracy after every exercise you complete. This will allow you to track how well you are doing. You can also refer to “My Progress” page to track your progress over time!"],
        "minimumScoreToPass": [0,0,0,0,0,0,0],
        "lessonDescriptions": ["","","","","","",""],
        "lessonImages": ["","","","","","",""],
        "lessonID": 2,
        "nextLessonID": 3,
        "chapterID": 1

    },
    {
        "lessonName": "Lesson 3: Body Posture",
        "lessonText": ["Sit up as straight as possible and keep your back straight.", "Rest your arms on the edge of the table. You should be able to freely move your wrists and hands.", "Keep your arms, shoulders, neck, and back relaxed."],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["images/lessons/proper_body_position.svg","images/lessons/proper_body_position.svg","images/lessons/proper_body_position.svg"],
        "lessonID": 3,
        "nextLessonID": 4,
        "chapterID": 1
    },
    {
        "lessonName": "Lesson 4: Hand Posture",
        "lessonText": ["Make sure your hands are raised so that your palms are not touching the keyboard or table."],
        "minimumScoreToPass": [0,0],
        "lessonDescriptions": ["",""],
        "lessonImages": ["images/lessons/proper_hand_position.svg","images/lessons/proper_hand_position.svg"],
        "lessonID": 4,
        "nextLessonID": 5,
        "chapterID": 1
    },
    {
        "lessonName": "Lesson 5: Keyboard and Finger Maps",
        "lessonText": ["In this tutorial, we will refer to your fingers as pinky, ring, middle, pointer, and thumb. Please see the chart below.","Please see the color-coded keyboard below. This keyboard will help you visualize which finger is used on each key.", "Always return your fingers to the starting position (`ASDF` for the left hand and `JKL&#59` for the right hand) as shown below.", "Always imagine this keyboard layout while keeping your eyes at the screen.", "Use the thumb of your dominant hand to press the `Spacebar`.", "Keep practicing with this keyboard layout. Even though it may seem difficult at first, you will be able to type easily and quickly after the tutorial is over."],
        "minimumScoreToPass": [0,0,0,0,0,0],
        "lessonDescriptions": ["","", "", "", "", ""],
        "lessonImages": ["images/lessons/hand_label_map.svg","images/lessons/keyboard_layout_map.svg","images/lessons/keyboard_layout_map.svg","images/lessons/keyboard_layout_map.svg","images/lessons/keyboard_layout_map.svg","images/lessons/keyboard_layout_map.svg"],
        "lessonID": 5,
        "nextLessonID": 6,
        "chapterID": 1
    },
    {
        "lessonName": "Lesson 6: Ways to Improve your Typing Skills",
        "lessonText": ["Practice, practice, practice! Practicing is the most effective way to improve your performance in anything, including typing! Even just practicing 30-minutes a day can help you improve your typing speed and accuracy.","Type without looking at the keyboard! Even when you are practicing alone at home, motivate yourself to type without looking at the keyboard. This will allow you to develop a habit of typing faster.","Slow down! In the beginning, try to focus on accuracy. The speed will follow when you practice using this tutorial. To increase accuracy, try not to use the ‘Delete’ key. Using the ‘Delete’ key teaches you how to fix errors, not how to reduce errors.","Find a rhythm! You should establish and maintain a rhythm while typing. This means that keystrokes should come at equal intervals. Rhythm is important because it helps you improve your accuracy."],
        "minimumScoreToPass": [0,0,0,0],
        "lessonDescriptions": ["","","",""],
        "lessonImages": ["","","",""],
        "lessonID": 6,
        "nextLessonID": 7,
        "chapterID": 1
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Welcome to your very first chapter! In Chapter 1, you will learn one of the most important concepts in typing: home row.", "Home row is the middle horizontal row of the keyboard. It is where your fingers return to when you are not typing. Your fingers should lightly keep in touch with their “homes” in the home row. This will help you find a reference point for other keys and allow you to type without looking at your hands.", "Home row includes keys: ‘A, S, D, F, J, K, L, semicolon (&#59)’.", "The image below illustrates where to place your fingers on the home row. Place your fingers gently on their respective keys, but make sure your fingers are lifted so that you are not actually pressing them!", "You can always find home by placing your fingers on the small bumps on ‘F’ and ‘J’."],
        "minimumScoreToPass": [0,0,0,0,0],
        "lessonDescriptions": ["","","","",""],
        "lessonImages": ["images/lessons/home_row_map.svg","images/lessons/home_row_map.svg","images/lessons/home_row_map.svg","images/lessons/home_row_map.svg","images/lessons/home_row_map.svg"],
        "lessonID": 7,
        "nextLessonID": 8,
        "chapterID": 2
    },
    {
        "lessonName": "Lesson 2: Left Hand (ASDF)",
        "lessonText": ["The home row keys for the left hand are ‘A, S, D, F’.", "Type the ‘F’ key using your left pointer.", "For spaces, use whichever thumb you feel most comfortable with. Remember, your thumbs should always remain at the ‘Spacebar’!", "Type using the ‘F’ and ‘Spacebar’ below.", "Great! Now let’s add the rest of the left hand. Please see the chart below to learn which fingers are used for which keys. Use your middle for ‘D’, ring for ‘S’, and pinky for ‘A’.", "Let’s practice some more with the ‘D’ key!", "Great! Now let’s add the ‘S’ key!", "Awesome job! Now let’s add the final key: ‘A’.", "Great job so far! As you complete the next exercise, try not to look down at the keyboard when you type.", "Awesome job! Let’s do another exercise!", "Great job so far! Let’s try another exercise.", "One last exercise! Let’s go!"],
        "minimumScoreToPass": [0,60,0,60,0,60,60,60,0,60,60,60],
        "lessonDescriptions": ["","ffffffffff", "", "f f ff fff ff f f f f f f ff fff f f ff ff fff ff fff", "", "d d dd fd df f dd dddf fd df fd dd df fd dff fd ddf dddf d df dfd fdf d fddd dfd", "ssd sfd sdf dfs ssf fds sfd dss sfd fsd sd ssd s sfds s dfs s s s d f df s f d s", "add das sdas aad fas ads afa fad das fads aad asda asa a d aa d dd a aa", "", "ffff aaaa dddd ssss fa sd adad fs da af fs dsdf fdsa fdsa fads fads fff asa as a s d f f d s a aa", "f f ffd ddfs a aaf s a d asdf fdsa a s d f f d s a asdf d af d af ddf ffd aaf ssd dda ffa dfd ada sfs fsf dad dads fads", "ffa dda ada dad ada fsd fsd daf fsd fas sfd ads add dad dda ada ffs ssf dff ffd dad dds fsd ads adf ads adf"],
        "lessonImages": ["","","","","","","","","","","",""],
        "lessonID": 8,
        "nextLessonID": 9,
        "chapterID": 2
    },
    {
        "lessonName": "Lesson 3: Right Hand (JKL&#59)",
        "lessonText": ["Awesome work on that left hand! Now let’s find a home for the your right hand fingers.", "Once again, make sure you gently place your right pointer on the ‘J’ key. The home row keys for the right hand are ‘J, K, L, &#59 (semi-colon)’.", "Type the ‘J’ key using your right pointer.", "Great! Now let’s add the rest of the home row for the right hand. Please see the chart below to learn which fingers are used to type which keys. Use your middle for ‘K’, ring for ‘L’, and pinky for ‘&#59’.", "Let’s practice some more with the ‘K’ key!", "Great! Now let’s add the ‘L’ key!", "Awesome job! Now let’s add the final key ‘&#59’.", "You are doing great! Let’s try an exercise with your entire right hand.", "Great job! Let’s do one more exercise."],
        "minimumScoreToPass": [0,0,60,0,60,60,60,60,60],
        "lessonDescriptions": ["","", "jjj j j jj jj jjj j", "", "jk kj kkj kj jk jkk kk k kk kk jk kjk kkjkj jjk kj jkkj k", "lkj jlkj llj lkl jlk ljlkj l l jlkjl jlkj jlkj llk jlkl lklj jlkjl l llkl ljkl lj l", "&#59 &#59&#59 k&#59l jlj&#59 &#59kl &#59j&#59 &#59ll&#59k j&#59kl&#59 &#59k&#59 &#59&#59 &#59k&#59j&#59lk j&#59l&#59 k&#59 k&#59 &#59kk &#59&#59kl&#59 j&#59 lk&#59 j&#59 lk&#59j &#59", "j j jjk k k kkl l l ll&#59 &#59 &#59 &#59&#59j j&#59 kl lk j&#59 l k jjj kkk jjj kkk lll kkk lll jjj &#59&#59&#59 jjl llj jjl kkj jkj kjk jkj jkj", "xlll &#59&#59&#59 kkk j&#59l jlk k&#59l jlk jlk k&#59l lj&#59 &#59kl &#59jl &#59&#59&#59 j k l &#59 &#59 l k j j&#59 &#59j kl lk k&#59 &#59k l&#59 &#59l jk&#59"],
        "lessonImages": ["","", "","","","","","",""],
        "lessonID": 9,
        "nextLessonID": 10,
        "chapterID": 2
    },
    {
        "lessonName": "Lesson 4: Left and Right Hand (ASDFJKL&#59)",
        "lessonText": ["Great job so far! Now let’s have some practice with your left and right hand together.", "Don’t forget all of the proper typing techniques that you have learned so far.", "Type the letters below.", "Type the letters below."],
        "minimumScoreToPass": [0,60,60,60],
        "lessonDescriptions": ["","fff jjj jjj ddd ddd kkk kkk sss sss lll lll aaa aaa &#59&#59&#59 aad jjl llk ddk &#59&#59s aak ssl lld ffj jjf alsk fjdk a&#59sl sldk","a s d f j k l &#59 &#59 a l s k d j f fdf fdf fdf dfd sas sas ssa jkj lkl jlj llk asdfjkl&#59 fjdk fjfj lsls add daa add dda llj jjl jjl llj","ds dasf&#59 llfaaaa jlakaflaf kja ajlldaskdff&#59 al kkllkjfk afaldjskdsdfafakfld fjslfsljsllad sdsjsallklk&#59 lfdjddjkd&#59 ajfsslddjs dlksjjjafj&#59 ajkadklf"],
        "lessonImages": ["","","",""],
        "lessonID": 10,
        "nextLessonID": 11,
        "chapterID": 2
    },
    {
        "lessonName": "Lesson 5: Extended Home Row (ASDFGHJKL&#59)",
        "lessonText": ["You might have noticed that we have not learned two letters on the home row yet. Can you identify them?", "We are missing ‘G’ and ‘H’! The keys we covered so far can all be typed without moving your fingers. Now, let’s learn how to move your fingers to reach ‘G’ and ‘H’.", "To reach ‘G’ and ‘H’, you will need to move your pointers. Try practicing this motion by following the illustration below. Your left pointer will hit the ‘G’ key and the right pointer will hit the ‘H’ key.", "Don’t forget to move your fingers back to the home row position after you type ‘G’ and ‘H’ keys."],
        "minimumScoreToPass": [0,0,0,60,60,60],
        "lessonDescriptions": ["","","","gg gg hh hh gh hg gh hg h h g g h h g fg fg gf fg gfdsa asdfg gf fg dfg gfd g f g f g a f s g f g", "hj hj jh hj hjkl&#59 &#59lkjh hj hk hl lh hj hjk &#59 &#59kjh hjkl&#59 h j h j k gh hg jf fj gj hf gk hd dj fl a&#59 lh hj ga sg sh lg dh gal lad", "hhh hhh ggg ggg hhh ggg jjj fff jjj ggg hhh fj jfj fjf hgh ghg hfh gjg jgj j f gjg hf gj hg gh hf jg fh ghg jfj"],
        "lessonImages": ["","","images/lessons/home_row_map.svg","","",""],
        "lessonID": 11,
        "nextLessonID": 12,
        "chapterID": 2
    },
    {
        "lessonName": "Chapter 1 Test",
        "lessonText": ["Try to type these letters as accurately as possible!","Remember to keep your hands on the home row!","Type the following words and letters. Try not to look down at the keyboard and remember your home!"],
        "minimumScoreToPass": [70,70,70],
        "lessonDescriptions": ["asdfghjkl&#59 &#59lkjhgfdsa alfalfas&#59 ashfalls haggadah&#59 haggadas halakahs&#59 halakhas halalahs", "hask khafk ah lads lag kaf fash&#59 flag flaks&#59 kafs alfs as lash sad&#59 ash ask flags&#59 flak dahs jag jags&#59 lags lakhs la khafs&#59 lad jaks dahls&#59", "flags flash shall gaff jag&#59 ha flag half sagas&#59 gags gash salad jags glad&#59 lash hash has as dad fad haha&#59 haj asks alls lass lash&#59 shag&#59 salad slags glass flags daffs algas flash add lad"],
        "lessonImages": ["","",""],
        "lessonID": 12,
        "nextLessonID": 13,
        "chapterID": 2
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Great job so far! You are well on your way to becoming an excellent typist!","But before we move onto the other rows, you need to understand one of the most important keys in typing. The ‘Shift’!"],
        "minimumScoreToPass": [0,0],
        "lessonDescriptions": ["",""],
        "lessonImages": ["",""],
        "lessonID": 13,
        "nextLessonID": 14,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 2: Introduction to Shift Key",
        "lessonText": ["Most keyboards have two ‘Shift’ keys: one on the left and one on the right.","The ‘Shift’ key is pressed using the pinky. Please see the illustration below and press the ‘Shift’ key to continue.", "Don’t forget to return your pinky back to Home Row after you release the ‘Shift’ key.", "‘Shift’ keys can be tricky at first. Try to use the ‘Shift’ key that is on the opposite side of the key you are typing.", "For instance, press the left ‘Shift’ key when you are typing a key on the right side of the keyboard.", "And press the right ‘Shift’ key when you are typing a key on the left side of the keyboard."],
        "minimumScoreToPass": [0,0,0,0,0,0],
        "lessonDescriptions": ["","","","","",""],
        "lessonImages": ["images/lessons/bottom_row_map.svg","images/lessons/bottom_row_map.svg","images/lessons/bottom_row_map.svg","images/lessons/bottom_row_map.svg","images/lessons/bottom_row_map.svg","images/lessons/bottom_row_map.svg"],
        "lessonID": 14,
        "nextLessonID": 15,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 3: Using Shift with Home Row Letters (A, S, D, F, H, J, K, L, &#59)",
        "lessonText": ["Now it is time to use the ‘Shift’ key with all of the home row keys!","The ‘Shift’ key serves two functions. First, it makes a lowercase letter an uppercase letter. So if you press on both ‘Shift’ and ‘f’ at the same time, it gives you ‘F’. For non-letter keys, it types the character that is located on top. For instance ‘&#59’ used with a ‘Shift’ key, will turn into ‘:’. Please see the illustration below.","Let’s try a few more exercises using the ‘Shift’ key!","Great job so far. Now let’s practice on actual words.","Awesome job! Let’s do another practice!"],
        "minimumScoreToPass": [0,0,70,70,70],
        "lessonDescriptions": ["","","AaA SsS DdD FfF GgG hHh jJj kKk lLl &#59:&#59 aSdFgHjKl: &#59 L K J H G F D S A aaa AAA aaa AAA &#59&#59&#59 ::: &#59&#59&#59 ::: aA aS Aa Ss :&#59 &#59: Ll lL LLJ FfA AaF fFA Faf AFA llJ JJL","Dallas ADA flag Alaska Flask AS : jads Hash sad Lass : Dads : Haha :salad&#59 salsa: Halls as&#59 gas: Add Flasks, ash: Alaska Lass &#59 saga: half flag:","dash Fads lads Lags dals Dahs lash Flag Shad dhal gals Fags Hags gads dags Gash Flak"],
        "lessonImages": ["","images/lessons/how_shift_works.svg","","",""],
        "lessonID": 15,
        "nextLessonID": 16,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 4: Shift with &#59, :, ‘, “', ",
        "lessonText": ["For our next lesson, we will explore how to use the ‘Shift’ key with the semicolon (&#59) to produce a colon (:) and how to use it with an apostrophe (’) to produce a quotation (“).","To reach these special characters, you will need to extend your pinky. Just like you did to reach the keys ‘G’ and ‘H’, you need to extend your right pinky to reach the the apostrophe (‘).","Let’s try reaching for the apostrophe (‘) a few times.","Great! Now let’s add the ‘Shift’ key to convert the semi-colon (&#59) to a colon (:) and the apostrophe (‘) to a quotation mark (“)."],
        "minimumScoreToPass": [0,0,70,70],
        "lessonDescriptions": ["","","‘ &#59’ ‘&#59’ &#59’ l&#59’ ‘&#59k ‘’&#59’ ‘ “add” “jlka”","‘ “ &#59&#59: “ ‘ “ ‘ “ “ “ : : : &#59 ‘&#59 l k” &#59:’l “ &#59 “ k’:”l&#59"],
        "lessonImages": ["images/lessons/special_key_explanation.svg","","",""],
        "lessonID": 16,
        "nextLessonID": 17,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 5: Basic Punctuations (,.!?)",
        "lessonText": ["We have now learned everything on the home row! Congratulations!","Before we move on to other letters, let’s cover how to properly reach for other basic punctuations.","If you look at the illustration of the keyboard below, you can see that the comma (,), period (.), and question mark (?) are located on the bottom row. You can access these keys using your middle, ring, and pinky.","You may have noticed that you need to use the ‘Shift’ key to access the question mark (?). To do this, hold the ‘Shift’ key and press the (/) key.","Now for the exclamation point (!), your left pinky will need to travel two rows up from the home row to press the ‘1’ key. But make sure to hold the ‘Shift’ key with your right pinky before you press the ‘1’ key.","Great! Now let’s put everything together. Don’t forget to return your fingers to your home row after you move them away to press other keys!","Great job! Let’s try one more exercise for this lesson."],
        "minimumScoreToPass": [0,0,0,70,70,70,70],
        "lessonDescriptions": ["","","","/? ???/ ?/ ?/? /?/ /&#59? ?&#59/’/”","a!aaA A!A!a1 a!1!a!a A!!","Salad! Dad’s “haha”? Alaska, flag. Add, salsa’s: lass HAHA?! “Dallas” Alfalfas, ashfalls&#59 “haggadah,” Haggadas! halakahs, halakhas? Halalahs.","flags dhaks Flash! flask? Lakhs. flaks “Skald” dhals. glads, dahls, slag? dahs: flak&#59 Gash Dhak hadj Dash! Daks lags, dhal: lakh “hags” fags, fash! Half"],
        "lessonImages": ["","images/lessons/keyboard_layout_map.svg","images/lessons/keyboard_layout_map.svg","","","",""],
        "lessonID": 17,
        "nextLessonID": 18,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 6: Caps Lock",
        "lessonText": ["What if you want to type multiple uppercase letters in a row? While you can press the ‘Shift’ key each time, you can also use the ‘Caps Lock’ key!","When pressed, the ‘Caps Lock’ key allows all letters to be generated in capitals until deactivated.","Usually, ‘Caps Lock’ only works on letter keys. For instance, if you press a non-letter key such as ‘1’ with your ‘Caps Lock’ on, you will still get ‘1’ instead of ‘!’.","Don’t forget to turn off ‘Caps Lock’ when you are done using it."],
        "minimumScoreToPass": [0,0,0,70],
        "lessonDescriptions": ["","","","ASDFLKJGH LKJ ALSDF. ASLKJG. ASLGK’S “LJAKJSFLD”! ASLG KSJLKJFA. SAD LAG! DAH GAD ‘HAD’ aSH “LAH” SHA! FAH GAS, GAL, dAG. DAK: KAF DAL LAD FAD hAJ ASK SAL, SAG? JAG FAG HAG JAk SKa"],
        "lessonImages": ["","","",""],
        "lessonID": 18,
        "nextLessonID": 19,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 7: Delete Key",
        "lessonText": ["Hopefully, you didn’t need to use the ‘Delete’ key that much so far! However, it is still important to review how to use the ‘Delete’ key.","Use your right pinky to reach for the ‘Delete’ key. But don’t forget to return your right pinky back home after you are done deleting!","Instead of relying on the ‘Delete’ key when you type, try to type carefully and accurately so that you do not have to use the ‘Delete’ key. Making mistakes is costly because you have to delete it then retype it. Just get it right the first time!"],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["","",""],
        "lessonID": 19,
        "nextLessonID": 20,
        "chapterID": 3
    },
    {
        "lessonName": "Chapter 2 Test",
        "lessonText": ["Focus on accuracy during this test. Make sure to get all of the characters correct!","Great job! Let’s do one more exercise to complete this chapter!"],
        "minimumScoreToPass": [80,80],
        "lessonDescriptions": ["“ha FLAG half lash&#59” gags ‘gash?’ salad: jags! “glad&#59 LaSH hash” has as dad, fad? haha&#59 “haj ASKS!” alls lass? Shag&#59 flags. “Flash, Shall gaff!” jagsalad? slags/ GLASS! FLAGS DAFFS AlGas “flash” add lad sagas&#59","S&#59 lldk! Kdgd fKhd ?gA k?&#59, “!” kFl “sl” ??dhh&#59f&#59 Kgk.l jJaa Fdjg? DgLgG ,dlh&#59, “,”dfGh&#59J ,gd a?sJl j!gd aSjh dj “!g &#59,kLdd&#59 gf,ka flaks skald dhals glads dahls"],
        "lessonImages": ["",""],
        "lessonID": 20,
        "nextLessonID": 21,
        "chapterID": 3
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Congratulations! You have now graduated from the home row! We will now move onto the top row.","Top row refers to the row above your home row. It includes the keys ‘Q, W, E, R, T, Y, U, I, O, P’.","Don’t forget to return your fingers back to your home row after you type something on the top row."],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["","images/lessons/top_row_map.svg",""],
        "lessonID": 21,
        "nextLessonID": 22,
        "chapterID": 4

    },
    {
        "lessonName": "Lesson 2: Left Hand (QWERT)",
        "lessonText": ["Keys ‘Q, W, E, R, T’ on the top row can be reached with your left hand.","You will be moving your fingers much more during this chapter. Remember to keep your fingers curved and pointed down on the keys.","Please see the chart below to learn which fingers are used to type which keys. Use pinky for ‘Q’, ring for ‘W’, middle for ‘E’, pointer for ‘R’, and pointer again for ‘T’!","Let’s first add the letter ‘Q’! Make sure to slow down to reach the new keys with accuracy.","ow let’s add the letter ‘W’!","Time to practice with ‘E’!","Don’t forget about ‘R’!","Finally, time to practice with ‘T’.","Great job! That was a lot of new keys to learn. Before we move on, let’s review some good typing habits. Remember to have the proper body posture when you type. In the next screen, we will review some of these tips for proper body posture.","Sit up as straight as possible and keep your back straight.","Rest your arms on the edge of the table. You should be able to freely move your wrists and hands.","Keep your arms, shoulders, neck, and back relaxed.","Let’s practice with all of the new keys that you have learned!","Awesome job! Let’s do one more practice!"],
        "minimumScoreToPass": [0,0,0,80,80,80,80,80,0,0,0,0,80,80],
        "lessonDescriptions": ["","","","Qqjda qfjq? Qhgdfgd! Qqq qhglaj! qgqf Qkga? Q, Qfga, qhh q qkj Qflfqhk “Qgqk” qhfjlg qga.","Wfgl, Wk wjjd Wwlwh Wdgg? Wfqagwh “Wwsfsja” wfq, Whdslh? Wklwjl, wqghg. Wjk wfj Wjas “Wqhddq” ws.","Eqhwq Eejgj eajhkas “Ef” ejqhhka, ejfga, efeqlq! “Ehqekaj” Ees: Egh Ejaha! ekeawjf efeed","Rswsqgd raq rw Rdkqsw, Rkd, rwrwef rgfhR rwwqd. Rkawagr! Rrdfj? Rses! Rjaerg? Rqaj! Rhrhdfr ‘rqgdekl’ rrdqfa: RrRj","Tjqagfh twge twsrgs tkdhqr, Taswh. Twwefs. tqdhekf! Thlgksl “tglr” tewj Twtrdrr, Tllfer, Tfwrgeg, tfhea Tdewafa","","","","","QAfd! Raws rare fares? Wrastled warstled Dwarfest selfward! “Leftward” wreath jehads “Father” staler THAWED larked staled fadges, drakes, grafts, talked.","awa, awash awl, awls ‘daw,’ dawk,ale, Alee! alef. alefs, ales “algae,” Grad grads Grass Haar haars, haggard, haggards, harass, hard, hards, hark, harks harl Harls harsh, jagra Jagras jar. jarl, jarls? jarrah, jarrahs, hafts, halt, halts. Hast!"],
        "lessonImages": ["images/lessons/top_row_map.svg","images/lessons/top_row_map.svg","images/lessons/top_row_map.svg","","","","","","","images/lessons/proper_body_position.svg","images/lessons/proper_body_position.svg","images/lessons/proper_body_position.svg","",""],
        "lessonID": 22,
        "nextLessonID": 23,
        "chapterID": 4
    },
    {
        "lessonName": "Lesson 3: Right Hand (YUIOP)",
        "lessonText": ["Now time to learn the right-hand side of the top row: ‘Y, U, I, O, P’!","You will be moving your fingers much more during this chapter. Remember to return your fingers back to the home row when you are not using them.","Please see the chart below to learn which fingers are used to type which keys. Use the pinky for ‘P’, ring for ‘O’, middle for ‘I’, pointer for ‘U’, and pointer again for ‘Y’.","Let’s first add the letter ‘P’! Don’t forget to slow down to accurately reach the new key.","Great work! Let’s add the key ‘O’.","Time to learn the key ‘I’.","Let’s add ‘U’!","The final key ‘Y’. Let’s practice it!","Great! You have now learned all of the top row. Let’s practice some more!","One last exercise to finish the lesson!"],
        "minimumScoreToPass": [0,0,0,80,80,80,80,80,80,80],
        "lessonDescriptions": ["","","","Padshahs pah pal Pall palls palp palpal Palps Pals pap papa papal papas Paps pas pash Pasha pashas","oaf oafs Oak oaks Odd Odds ods of off offal Offals offload offloads Offs ogdoad ogdoads oh oho Ohs Oka okas Old Olds olla ollas ooh","id Ids if iff Ifs Ilia iliad iliads ilial Ilk Ilka ilks ill ills Is Ia Ita Ipoew Iqrt Ipq Iwpee","Ugalis Uplaid Uhs up upas upload ugh Uphold upholds Ughs Upgo upfolds uphild ugs uploads Updo updos uh upfold","Yogi Yuko You youk youks yah Yahs Yak yous yuga yolks Yugas yugs Yuk yukos Yuks yup yogis yoks yokul yold yolk","Oaf Yap padouk Yak yaks uploads, pads, Paid, paik oafs Paiks “oaks” Ups upsy? Oaky odal Ya yads Oak us yald.","Shipload “goldfish” ladyfish, FLAGSHIP, oafishly, Ladyship. aguishly! haploidy? “haploids” Holidays!! Hidalogs uphods soapily dishful huskily"],
        "lessonImages": ["","","images/lessons/top_row_map.svg","","","","","","",""],
        "lessonID": 23,
        "nextLessonID": 24,
        "chapterID": 4
    },
    {
        "lessonName": "Lesson 4: Left and Right Hand (QWERTYUIOP)",
        "lessonText": ["We will now combine your left and right hands for the top row. Remember to return your fingers back to the home row when you are not using them.","Make sure to slow down to reach the new keys with accuracy.","Great job! That was a lot of new keys to learn. Before we move on, let’s review some good typing habits. Remember to have the proper hand posture when you type! In the next screen, we will review some of these tips for proper hand posture.","Make sure your hands are raised so that your palms are not touching the keyboard or table.","Make sure your fingers are curved and pointed down at the keys.","Let’s practice some more!","Type the words below."],
        "minimumScoreToPass": [0,80,0,0,0,80,80],
        "lessonDescriptions": ["","Quatrefoils Outsparkled! “playwrights” Fluoridates, profligates, righteously. Waterdogs drawliest ‘outprayed’ forestial: laughters: horsetail? euphorias odalisque UPLIFTERS playhouse, Upgrowth, sideograph.","",",","","Dihwater headfirst waterlogs PREADUITS uplighted! autopsied redisplay saprolite plowhead skryolites foresight, preflight, holidayer? afterglow. horseplay ‘doughlike’ “polyhedra,” Wordplays! Thioureas? Leadworks ROPEWALKS","Pyet typier pyot Query Ewt eyot ire it outer Outre Owe ower pyrite Qi quep typer quey Pyre Typo Ow tyre tyro Opt opter Uey up eutropy Upter uptie"],
        "lessonImages": ["","","","images/lessons/proper_hand_position.svg","images/lessons/proper_hand_position.svg","",""],
        "lessonID": 24,
        "nextLessonID": 25,
        "chapterID": 4
    },
    {
        "lessonName": "Chapter 3 Test",
        "lessonText": ["Focus on accuracy during this test. Make sure to get all of the characters correct!","Complete the final typing exercise for this chapter!"],
        "minimumScoreToPass": [90,90],
        "lessonDescriptions": ["Gatefolds, dialogers! “Atrophies,” giftwares? Outfields, Walkyries, Headworks, Frugality! Dishtowel “daughters” ‘grapeshot: fieldwork deflators ‘sprightly’ prudishly? Polarised! Therapsid? “Jailhouse” Southerly. Filatures! “Hairstyle” hysteroid Doughtily outglares outglared! Sailer sailed? “Lugers” widget shriek? Guyots. Ligers Golder.","Epopee, equity! euripi? Irrupt ‘orrery,’ Output truer tuque tutee, tutor, tutti, tutty tuyer Tweet, twerp, “twier,” twirp pewterer, portiere potterer? eyepopper, Outpourer pirouette, potpourri preterite Preppier, preterit prettier priority: properer!"],
        "lessonImages": ["",""],
        "lessonID": 25,
        "nextLessonID": 26,
        "chapterID": 4
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Great job so far! Now that you have mastered the home and top row, there is only one more row to master. Time to learn the bottom row!","Bottom row refers to the row below your home row. It includes the keys ‘Z, X, C, V, B, N, M’.","Just like you did for the top row, don’t forget to return your fingers back to your home row after you type something on the bottom row."],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["","images/lessons/bottom_row_map.svg",""],
        "lessonID": 26,
        "nextLessonID": 27,
        "chapterID": 5
    },
    {
        "lessonName": "Lesson 2: Left Hand (ZXCVB)",
        "lessonText": ["Keys ‘Z, X, C, V, B’ on the bottom row can be reached with your left hand.","Please see the chart below to learn which fingers are used to type which keys. Use pinky for ‘Z’, ring for ‘X’, middle for ‘C’, pointer for ‘V’, and pointer again for ‘B’!","This exercise will introduce the ‘Z’ key. Let’s start!","Great! Now let’s add ‘X’.","Excellent job so far. Let’s add key ‘C’ now.","Almost finished with the bottom row! Time to add ‘V’.","Last key! Let’s practice the ‘B’ key.","Awesome! We finished the bottom row for the left hand. Before we complete this lesson, let’s remember review some tips to keep in mind when typing to improve your skills.","Find a rhythm! You should establish and maintain a rhythm while typing. This means that keystrokes should come at equal intervals. Rhythm is important because it helps you increase accuracy.","Let’s practice with all of the new keys that you have learned!","Great job! Remember to find a good rhythm when typing this time.","Awesome! One last exercise to complete this lesson."],
        "minimumScoreToPass": [0,0,90,90,90,90,90,0,0,90,90,90],
        "lessonDescriptions": ["","","Zags zero “Zoo” zealot, zo zoril. Zoea!l Zaire zite Zati zeta&#59 zila “zoea” zit ‘zoa’ Zerda? zed&#59 zel! zea? Zelator zeal","Xi xu “Xrayed” xystoi xrays! xyloid, xylose. Xray xyst? Xyster! xysti’ ‘Xis’","Capsulized! captious. captiously “Captured” cardy captures capul capuls “Caput” car Card, Cardhouse, captor, captors. cardi? cardie “cardies”","Volts voluspa! Vorpal Vortex vortical, vortices volute voluted volutes Votaries, Votary, vote Voted, voter! “Voracity” Vorlage, vorlages.","Backstory Bagels? backveld bailouts bails. bait Bade badge bagful Backswept backsword Bafts, bag, bagel. backup! Backups badger.","","","Cob Voice cozie, Beau, Cub cube! beaux Bivouac obia Ova ox cobza Cove. zoea bize Boa Box coxae “Coze” vie Zoa&#59 zax zobu buaze! cue cuz vocab voe zebu.","Cauterize Ectozoa. Ecotour! ebriate&#59 bioactive Bacterize. Activizer Exoteric exorcize Obviator, Icewater, exuviate? Voicebox. trivia Towier towbar Vizirate equator victoria.","Heartblock Hawseblock cratefuls? Crashdove crashdive. Hardcopies grubstaked Capsulized, Caprifoles grouchiest harpylike “Butlership” bushwalker Harpsicle. Halicores? calfdozers Cabriolets byproducts."],
        "lessonImages": ["","images/lessons/bottom_row_map.svg","","","","","","","","","",""],
        "lessonID": 27,
        "nextLessonID": 28,
        "chapterID": 5
    },
    {
        "lessonName": "Lesson 3: Right Hand (NM,./)",
        "lessonText": ["You are almost done learning all of the letters on the keyboard! Please see the chart below to learn which fingers are used to type which keys. Use the pinky for forward-slash (/), ring for period (.), middle for comma (,), pointer for ‘M’, and pointer again for ‘N’.","Since you are already familiar with the period (.) and comma (,), we will just focus on forward-slash (/), ‘M’, and ‘N’.","Complete the exercise below for the ‘N’ key.","Great! Now let’s practice with the ‘M’ key.","Final key! Forward slash (/) is not used often, but it is still useful.","Great job! Since you have already learned the period (.) and comma (,), we are all done! But before we continue, let’s review good typing habits to improve your skills.","Set certain goals based on your current typing speed and try to aim faster each session you practice. By motivating yourself to hit certain targets, you will witness your typing speed improve significantly over time.","Let’s practice with all of the new keys that you have learned with your right hand."],
        "minimumScoreToPass": [0,0,90,90,90,0,0,90],
        "lessonDescriptions": ["","","Nag nags? neighs noils Naif “nod” nodal negs Naifs Noise nose? naiks Neif neifs Neig, Nodalise node! nail No.","“Medial” Mensh Median meloids, Mid. midas Melon, mesa mensa ‘Mensal’ Mines minged Midge, Medials, media? Minges mingle.","Linos/song songlike//naled naleds///name/ Lions nife//nifes///solid","","","Medal Nodal, node/. Nodi medial//Median. Muled Muon/na, Nail. nailed medina. nod Media, nodule, noel, noil//nole nomad/Melano melanoid meld/."],
        "lessonImages": ["images/lessons/bottom_row_map.svg","","","","","","",""],
        "lessonID": 28,
        "nextLessonID": 29,
        "chapterID": 5
    },
    {
        "lessonName": "Lesson 4: Left and Right Hand",
        "lessonText": ["We will now combine your left and right hands for the bottom row. Remember to to return your fingers back to the home row when you are not using them!","Type the words below.","Awesome! Let’s try one more practice with the bottom row."],
        "minimumScoreToPass": [0, 90, 90],
        "lessonDescriptions": ["","Conium. Zinc, camion//cabmen. nix nib Nab mux Mob bucine Zobu zine Cinema “Abune” Above&#59 zone? bean Beam. bani/Zoic zoea.","Clanks As an Bam chalks. Am cam, Chanks, zax ash? Alb, abs Za Blanks. blanch Blacks zacks/. Zas van Sax ax//Cab ban?"],
        "lessonImages": ["","",""],
        "lessonID": 29,
        "nextLessonID": 30,
        "chapterID": 5
    },
    {
        "lessonName": "Chapter 4 Test",
        "lessonText": ["Now that you have learned all of the alphabet keys on the keyboard, this chapter test will review the use of  all of them!","Hopefully by now, you feel very comfortable with touch typing! Continue to improve your speed, accuracy, and techniques for this chapter test and try not to look down at the keyboard when completing the exercises!","This exercise contains long words! Good luck!","Now we will focus on shorter words. Try to find a good rhythm!","Type the words below!"],
        "minimumScoreToPass": [0,0,90,90,90],
        "lessonDescriptions": ["","","Bowstringed Whitecombs “whiteboard” Bodysurfing ‘Formatively’ forjudgment/? Abridgments Decryptions! Elucidators earth/moving Zymographs zygopterid, abolishment, campgrounds, chimneypots decurvation // boulderings.","Bald chis, Lade/lacy chip “Chin” Able, mink, Mine. Mind flam fax max Gap’s Gapo “Ions” into Gape! gaol: Bake Mils&#59 milk bait Hawk have abid//Abet lads Lack/. zoa Zit bail.","Falx Balm, Flab, flax. calx Aeon “Tony” Wait naoi Fan pal nap Lap alp Van can Lac//ban lab nab Cab Lam equal Panel, uveal, plane Mac, mal van. bal lax, man lav Zax! bac vac bam clam Calm. lamb? calf clash/of/clan!"],
        "lessonImages": ["","","","",""],
        "lessonID": 30,
        "nextLessonID": 31,
        "chapterID": 5
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Now that you have mastered all of the alphabet keys on the keyboard, now it is time to learn how to type numbers on the top of your keyboard!","This chapter is designed to use the number row, the number keys on the top of your keyboard, not the numeric pad.","Make sure to move only one finger at a time! The other fingers should be resting on the home row at all times."],
        "minimumScoreToPass": [0,0,0],
        "lessonDescriptions": ["","",""],
        "lessonImages": ["","images/lessons/number_row_map.svg",""],
        "lessonID": 31,
        "nextLessonID": 32,
        "chapterID": 6
    },
    {
        "lessonName": "Lesson 2: Left Hand (12345)",
        "lessonText": ["The numbers ‘1, 2, 3, 4, 5’ can be reached with your left hand. Please see the chart below to learn which fingers are used to type which keys. Use pinky for ‘1’, ring for ‘2’, middle for 3’, and pointer for ‘4’ and ‘5’.","Let’s start with number ‘1’!","Great! Let’s move onto ‘2’!","Awesome work! Let’s practice with ‘3’!","Great! Let’s finish with both ‘4’ and ‘5’!","Awesome work. Let’s finish with all of the numbers on the left hand side. Remember to return your fingers to the home row."],
        "minimumScoreToPass": [0,80,80,80,80,80],
        "lessonDescriptions": ["","111 111 aaa a11 1a1 aa1 11a aa111 1a1 1 1 1 a a 1 a 1 aa 1 1","2 sss 222 s 2 s 2 s 22 s s 2 2 s 2 ss 2 2 222 s 2 ss 2 2 s 22 s s s 22","3333 dd 3 d 3 ddd 3 d 3 d 3 333 d d 3 ddd 3 3 3 d d3 3 d 3 d d dd3 3 3","f5 555 f f f  5 f 5 fff 5f 5 5 5 f 5 g 4 f 4 f 444 g 5 4 f 5 4 4 g 44 5 f 4 5 f5 5 4f","1a1a 2s2s 3d3d 4f4f 5f5f 11q 22w 33e 44r 55r 11z 22x 33c 44v 55v 12345"],
        "lessonImages": ["images/lessons/number_row_map.svg","","","","",""],
        "lessonID": 32,
        "nextLessonID": 33,
        "chapterID": 6
    },
    {
        "lessonName": "Lesson 3: Right Hand (67890)",
        "lessonText": ["The numbers ‘6, 7, 8, 9, 0’ can be reached with your right hand. Please see the chart below to learn which fingers are used to type which keys. Use pinky for ‘0’, ring for ‘9’, middle for ‘8’, and pointer for ‘7’ and ‘6’.","Let’s start with number ‘0’!","Great! Let’s move onto ‘9’!","Awesome! Let’s practice with ‘8’.","Great work. Let’s finish with both ‘7’ and ‘6’.","Awesome work! Let’s finish with all of the numbers on the right hand side. Remember to return your fingers to the home row."],
        "minimumScoreToPass": [0,80,80,80,80,80],
        "lessonDescriptions": ["","000 &#59 0&#59&#59 000 &#59 0&#59&#59 &#59&#590 &#590&#59 0&#590 00&#59 0&#59&#59 &#590&#59 000&#59 00 0 0 0 0&#590","99l ll9 9l9 9l9 999 l9l9 l999 l9ll 9l9 l9 l9l999 l9l 9l9l l9l9l","88k8k8k 888k8kk8 888k8 8k8 88k8 88k8 8k888 k8k8kk 888","7jjj 7j7j 77j7 7j7 777 j6 6j66 66jj6j6j 6jj6jj66j6 6j6j6 6 6 6 6j6j6 j7j 7j 77j 7","6j6j 77j7j 8jk8k8k 9l9l9l 0&#590&#5909k8j7j6h6j7j 9j9 h8j 8j8j 0l 0l0l k9 k"],
        "lessonImages": ["images/lessons/number_row_map.svg","","","","",""],
        "lessonID": 33,
        "nextLessonID": 34,
        "chapterID": 6
    },
    {
        "lessonName": "Lesson 4: Left and Right Hand",
        "lessonText": ["Before we combine the left and right hands, don’t worry too much about hitting the keys on the number row with the designated fingers. Unlike the alphabet keys, you have more flexibility when you reach for the number keys!","Type the words below!","Great! Let’s try some more examples."],
        "minimumScoreToPass": [0,90,90],
        "lessonDescriptions": ["","6 times 6 is 36. 7 minus 2 is five. 10 times 10 is 100. 6 divided by 2 is 3. 2 plus 4 times 8 times 7 times 0 is 2. 8 plus 2 is 10. 99 plus 2 is 101.","24 divided by 8 is 3. 1 plus 1 is 2. 9 minus 9 is 0. 5 times 5 is 25. 6 times 6 is 36. 9 plus 1 is 10. 72 - 4 is 68. 0 times 100 is 0. 3 times 3 is 9. 7 minus 0 is 7."],
        "lessonImages": ["","",""],
        "lessonID": 34,
        "nextLessonID": 35,
        "chapterID": 6
    },
    {
        "lessonName": "Lesson 5: Arithmetic Operations",
        "lessonText": ["In this lesson, you will learn how to type using basic arithmetic operations. Arithmetic operations implies the study of numbers with traditional operations, such as addition, subtraction, multiplication and division.","We will be using (+) for plus, (-) for minus, (*) for multiplication, (/) for division, and (=) for equal sign. Please see the map below on how to reach for these keys.","Type the arithmetic statements below.","Great! Let’s try some more examples"],
        "minimumScoreToPass": [0,0,90,90],
        "lessonDescriptions": ["","","6 * 6 = 36, 6 / 6 = 1, 7 - 2 = 5, 10 * 10 = 100, 6 / 2 = 3, 2 + 4 * 8 * 7 * 0 = 2, 8 + 2 = 10","24 / 8 = 3, 1 + 1 = 2, 9 - 9 = 0, 5 * 5 = 25, 6 * 6 = 36, 9 + 1 = 10, 27 - 7 = 20, 0 * 100 = 0, 9 - 2 = 7"],
        "lessonImages": ["","images/lessons/keyboard_layout_map.svg","",""],
        "lessonID": 35,
        "nextLessonID": 36,
        "chapterID": 6
    },
    {
        "lessonName": "Chapter 5 Test'",
        "lessonText": ["Type the letters and number below.","Type the letters and numbers below."],
        "minimumScoreToPass": [90,90],
        "lessonDescriptions": ["7 minus 2 is five. 10 times 10 is 100. 2 + 4 * 8 * 7 * 0 = 2, 8 + 2 = 10. 9 plus 1 is 10. 72 - 4 is 68. 24 / 8 = 3, 1 + 1 = 2, 9 - 9 = 0. 72 + 8 = 80","64 - 4 = 60. 64 minus 4 is 60. 29 - 2 = 27. 29 minus 2 is 27. 30 + 30 = 60. 30 plus 30 is 60. 12 + 21 = 33. 12 plus 21 is 33. 6 / 2 = 3. 6 divided 2 is 3. 1 * 1 = 1. 1 times 1 is 1."],
        "lessonImages": ["",""],
        "lessonID": 36,
        "nextLessonID": 37,
        "chapterID": 6
    },
    {
        "lessonName": "Lesson 1: Introduction",
        "lessonText": ["Congratulations on making it to the final chapter! This chapter contains lessons and exercises that combines everything that you have learned. By completing these lessons and exercises, you will be able to increase your WPM, accuracy, and overall typing skills."],
        "minimumScoreToPass": [0],
        "lessonDescriptions": [""],
        "lessonImages": [""],
        "lessonID": 37,
        "nextLessonID": 38,
        "chapterID": 7
    },
    {
        "lessonName": "Lesson 2: Common Words",
        "lessonText": ["Practicing is all about repetition. That is why this lesson is focused on common English words that are used today. By practicing common words, you will learn to memorize them and type faster!","“The” and “be” are two of the most used words!","Now let’s practice more common words!","Great! Now let’s practice more common words.","Awesome work! Now’ let’s practice more common words.","Great job! We just covered the top 30 most used English words!","Type the commonly used words below."],
        "minimumScoreToPass": [0,90,90,90,90,0,95],
        "lessonDescriptions": ["","The the the the The The the the the The be Be Be be be Be The The the the the Be Be be Be be Be be Be Be be The The the the Be be Be be The the the Be be Be","To to to To to to To and And and and And and and and a a a A a A A in In in in in In in In in that That that that that That have have have Have Have have I I I I The The the the The be Be be Be be","It it it it It it for For for for For not not not not Not on On On on with With With with with With he He he He he he He as As as As as As you You You You you you do Do Do Do do do do At At at at At at at at At at at","This this this this this this This but But But But But But but his His his His his by By By By by From From from from they they They They they they we We We we we say Say Say her her her Her she She she She she She she She","","The the the Be Be be be To to to To and And and A in In in in hat That have have have I I I t It it for For not not Not on On On with With he He he He he he He as As you do Do Do Do at at At at this this This but But By By By by From From They they they we We We we Say Say her her her Her she"],
        "lessonImages": ["","","","","","",""],
        "lessonID": 38,
        "nextLessonID": 39,
        "chapterID": 7
    },
    {
        "lessonName": "Lesson 3: Common Sentences",
        "lessonText": ["In this lesson, you will be typing complete sentences. Most of our exercises until now have been words that are not related to each other. Now, we will practice frequently used sentences in English!","Sentences have a unique structure to them that you should become familiar with. For example, they always start with a capital letter and usually end with a period. By practicing with sentences, automatically reaching for the ‘Shift’ key at the beginning of each sentence will come naturally!","Greetings!","Planning meals!","Happy, happy, happy!"],
        "minimumScoreToPass": [0,0,90,90,90],
        "lessonDescriptions": ["","","Good morning! Good afternoon. Goodnight. How are you? How was your weekend? Not bad, thanks. I haven’t seen you in a while. I’m so pleased to meet you. I’m doing fine, thanks. How’s your week been? I’ll see you later!","Let’s grab lunch. I know a good place nearby. Let’s cook dinner tomorrow night. I’ll have the same. Let’s get a drink sometime. What do you want for lunch? What are they serving today? Let’s go to a restaurant. That grocery store sells fresh products.","I’m very happy right now. He is very happy. I feel great! This is so awesome! What would make you happy? She is so happy right now. When was your happiest moment? My goal in life is to make other people happy. I feel like a champion."],
        "lessonImages": ["","","","",""],
        "lessonID": 39,
        "nextLessonID": 40,
        "chapterID": 7
    },
    {
        "lessonName": "Lesson 4: Long Passages",
        "lessonText": ["This lesson will introduce you to longer passages. But don’t worry, the passages will cover fun facts about the ocean! So you will not only practice typing long passages, but also learn fun facts!","These passages will be longer than the ones you have seen and practiced earlier. Make sure to find a good rhythm while you type, so that you don’t get too tired halfway through!","Our Blue Planet.","Deepest known area of the world is...","What lives in the water?","The Pacific Ocean!","It is time to clean up our ocean!"],
        "minimumScoreToPass": [0,0,90,90,90,90,90],
        "lessonDescriptions": ["","","Three-fourths of the earth is covered with water. In fact, there is around 1,260,000,000,000,000,000,000 liters of water in our world. When astronauts first saw the planet from space, they could mostly see water, so they called it the ‘Blue Planet’.","The deepest known area of the earth’s oceans is known as the Mariana Trench. Its deepest point measures 11km. That’s a long dive down! Because it is so deep and difficult to travel to, more people have been to the moon than have explored the Mariana Trench!","While there are countless marine life forms known to man, there are many that have yet been discovered. Some scientists suggest that there could actually be millions of marine life forms out there.","The Pacific Ocean is the world’s largest body of water. Its area covers at least one-third of the total surface area of the earth. It’s so large that it covers more area than all land masses of the world combined! It is also home to some 25,000 islands.","There’s a huge “island” of trash floating around the northern area of the Pacific Ocean right now. It is called the Great Pacific Garbage patch. This plastic garbage island floats inside the center of the Pacific’s rotating ocean current."],
        "lessonImages": ["","","","","","",""],
        "lessonID": 40,
        "nextLessonID": null,
        "chapterID": 7
    },
]
const games = {
    "spacerace": ["park", "pick", "hole", "rock", "sea", "ice", "lake", "pony", "open", "hill", "grass", "balloon", "beach", "heat", "trip", "winter", "summer", "spring", "fall", "verb", "noun", "adjective", "adverb", "clause", "gerund", "infinitive", "participle", "predicate", "pronoun", "subject", "as", "at", "by", "in", "of", "on", "to", "up", "hi", "no", "am", "an", "my", "is", "arm", "ant", "bed", "bus", "bee", "car", "cap", "cat", "cow", "cat", "cow", "dog", "fan", "fly", "fox", "for", "gym", "hot", "hat", "hen", "jet", "key", "mid", "one", "owl", "off", "pig", "pig", "red", "rug", "rat", "saw", "six", "son", "two", "ten", "tie", "yes", "you", "eat", "nap", "rap", "tap", "pat", "red", "amid", "atop", "back", "blue", "boat", "belt", "bear", "bird", "bull", "book", "cold", "cool", "coat", "calf", "desk", "door", "deer", "duck", "duck", "desk", "ears", "eyes", "exam", "face", "feet", "foot", "four", "five", "fish", "frog", "from", "gray", "goat", "goat", "glue", "hair", "head", "hall", "into", "judo", "legs", "lamp", "lock", "lion", "like", "lamb", "math", "neck", "nose", "nine", "near", "next", "over", "pink", "past", "plus", "quiz", "roof", "room", "skin", "sink", "sofa", "ship", "suit", "seal", "save", "toes", "taxi", "than", "till", "tape", "test", "upon", "vase", "wall", "warm", "wolf", "with", "okay", "name", "some", "food", "hurt", "mood", "read", "lead", "attic", "about", "above", "after", "along", "among", "black", "brown", "boots", "below", "chair", "couch", "clear", "camel", "chalk", "coach", "drill", "dress", "eight", "eagle", "floor", "foggy", "green", "goose", "hands", "horse", "humid", "horse", "horse", "jeans", "knife", "knees", "mouth", "niece", "plane", "porch", "pants", "panda", "puppy", "paper", "rainy", "round", "ruler", "seven", "shelf", "snowy", "sunny", "scarf", "shirt", "shoes", "skirt", "socks", "shark", "sheep", "snail", "snake", "since", "sheep", "staff", "teeth", "tooth", "three", "table", "train", "truck", "tiger", "times", "under", "until", "uncle", "white", "windy", "zebra", "Friday", "Monday", "Sunday", "aboard", "absent", "across", "amidst", "around", "before", "behind", "beside", "boxing", "binder", "carpet", "closet", "cloudy", "cousin", "campus", "dining", "donkey", "except", "father", "folder", "garage", "gloves", "grades", "hammer", "hockey", "inside", "jacket", "kitten", "laptop", "lesson", "mirror", "monkey", "mother", "nephew", "orange", "pliers", "purple", "rabbit", "rowing", "reader", "stairs", "subway", "stormy", "slacks", "spider", "sister", "thumbs", "tongue", "toilet", "turtle", "toward", "turkey", "tennis", "wrench", "window", "within", "yellow", "Saturday", "Tuesday", "Thursday", "Wednesday", "airplane", "alligator", "against", "alongside", "aquatics", "archery", "athletics", "academia", "basement", "bath tub", "bathroom", "bedroom", "blanket", "bookcase", "bicycle", "beneath", "between", "brother", "badminton", "baseball", "basketball", "backpack", "bookmark", "ceiling", "curtain", "cheetah", "chicken", "chimpanzee", "crocodile", "chicken", "canoeing", "cycling", "calculator", "calendar", "classroom", "college", "dolphin", "despite", "durinng", "daughter", "dictionary", "elephant", "excepting", "equestrian", "fingers", "furniture", "following", "fencing", "football", "giraffe", "goldfish", "grandson", "gymnastics", "geography", "graduate", "hallway", "helicopter", "hamster", "handball", "instructor", "kitchen", "kangaroo", "keyboard", "lobster", "library", "lunchroom", "motorcycle", "memorize", "notebook", "octopus", "opposite", "outside", "picture", "pajamas", "printer", "project", "professor", "question", "raincoat", "regarding", "rooster", "scissors", "shoulders", "stomach", "slippers", "stockings", "sweater", "sweatshirt", "scorpion", "squirrel", "stepmother", "stepson", "sailing", "shooting", "softball", "scissors", "student", "stapler", "scholar", "scholastic", "t-shirt", "trousers", "through", "towards", "taekwondo", "triathlon", "teacher", "textbooks", "underpants", "undershirt", "underneath", "university", "volleyball", "vocabulary", "vocational", "without", "writing", "workshop"],
    "challenge": ["Time is money.", "Just go for it.", "Live the moment.", "Choose to shine.", "Your Time is Now.", "No pain, no gain.", "I can and I will.", "Let your love out.", "Too clever is dumb,", "Yes, No, Maybe So.", "Own less. Do more.", "We are all mad here.", "You live only once.", "Paint the town red.", "Ride like the wind.", "No feeling is final.", "Kindness is wisdom.", "Order brings peace.", "What is done is done.", "It is never too late.", "Don’t rush things.", "Never stop dreaming.", "Time is all we have.", "You are your choices.", "Follow your own star.", "Every moment matters.", "Shine like the stars.", "Time discovers truth.", "Think outside the box.", "What is normal anyway?", "Nobody cares about it.", "Do not worry, be happy.", "Think Less. Feel More.", "Good things take time.", "Time eases all things.", "Thoughts rule the world.", "Make today awesome!", "My life is my argument.", "Dream big. Pray bigger.", "Work hard. Stay humble.", "Kindness is contagious.", "Be true to who you are.", "Curiouser and curiouser!", "Tomorrow is another day.", "Dance lightly with life.", "Enjoy the little things.", "Leave no stone unturned.", "Enjoy the little things.", "The best is yet to come.", "You make my heart smile.", "Be obsessively grateful.", "Faith can move mountains.", "Success and nothing less.", "Fight till the last gasp.", "Better things are coming.", "What we think, we become.", "Truth is a pathless land.", "Never doubt your instinct.", "I can, therefore I am.", "Stay hungry. Stay foolish.", "I think, therefore I am.", "If there is no wind, row.", "Broken crayons still color.", "Beginnings are always messy.", "Courage does not always roar.", "And so the adventure begins.", "If you want it, work for it.", "Never, never, never give up.", "If you are good life is good.", "Ultimately love is everything.", "You can if you think you can.", "Every day is a second chance.", "Kindness is always beautiful.", "Even monkeys fall from trees.", "What you seek is seeking you.", "Life is tough but so you are.", "Much effort, much prosperity.", "Dream big and dare to fail.", "Collect moments – not things.", "Never, never, never give up.", "Live the life you’ve dreamed.", "Love For All, Hatred For None.", "Whatever you do, do it well.", "What we think, we become.", "Strive for greatness.", "And still, I rise.", "Turn your wounds into wisdom.", "It hurt because it mattered.", "No guts, no story.", "My life is my message.", "Boldness be my friend.", "Keep going. Be all in.", "My life is my argument.", "Dream big. Pray bigger.", "Fight till the last gasp.", "Broken crayons still color.", "And so the adventure begins.", "If you want it, work for it.", "Actually, you can.", "Yes!! Yes!! You can do it!", "Focus on the good.", "You are doing great.", "e happy. Be bright. Be you.", "We rise by lifting others.", "Go for it.", "Let it be.", "Keep going.", "Choose joy.", "Enjoy today.", "Keep it cool.", "Take it easy.", "Be in the now.", "Live the moment.", "Choose to shine.", "No pain, no gain.", "Do it. With love.", "I can and I will.", "It is what it is.", "Love conquers all.", "Keep your chin up.", "Follow your heart.", "Don’t rush things.", "You only live once.", "Never stop dreaming.", "Now is all you have.", "Keep moving forward.", "This too shall pass.", "Every moment matters.", "Love more. Worry less.", "Dust settles. I do not.", "Work hard. Stay humble.", "Enjoy the little things.", "The best is yet to come."],
    "boatrace": ["The Gnat and the Bull \\nA Gnat flew over the meadow with much \\nbuzzing for so small a creature and \\nsettled on the tip of one of the horns \\nof a Bull. After he had rested a short \\ntime, he made ready to fly away. But \\nbefore he left he begged the pardon of \\nthe Bull for having used his horn for a \\nresting place. \"You must be very glad to \\nhave me go now,\" he said. \"It is all the \\nsame to me,\" replied the Bull. \"I did \\nnot even know you were there.\" We are \\noften of greater importance in our own \\neyes than in the eyes of our neighbor. \\nThe smaller the mind the greater the \\nconceit.", "The Plane Tree \\nTwo Travellers, walking in the noonday \\nsun, sought the shade of a widespreading \\ntree to rest. As they lay looking up \\namong the pleasant leaves, they saw that \\nit was a Plane Tree. \"How useless is the \\nPlane!\" said one of them. \"It bears no \\nfruit whatever, and only serves to \\nlitter the ground with leaves.\" \\n\"Ungrateful creatures!\" said a voice \\nfrom the Plane Tree. \"You lie here in my \\ncooling shade, and yet you say I am \\nuseless! Thus ungratefully, O Jupiter, \\ndo men receive their blessings!\" Our \\nbest blessings are often the least \\nappreciated.", "The Crow and the Pitcher \\nIn a spell of dry weather, when the \\nBirds could find very little to drink, a \\nthirsty Crow found a pitcher with a \\nlittle water in it. But the pitcher was \\nhigh and had a narrow neck, and no \\nmatter how he tried, the Crow could not \\nreach the water. The poor thing felt as \\nif he must die of thirst. Then an idea \\ncame to him. Picking up some small \\npebbles, he dropped them into the \\npitcher one by one. With each pebble the \\nwater rose a little higher until at last \\nit was near enough so he could drink. In \\na pinch a good use of our wits may help \\nus out.", "The Wild Boar and the Fox \\nA Wild Boar was sharpening his tusks \\nbusily against the stump of a tree, when \\na Fox happened by. Now the Fox was \\nalways looking for a chance to make fun \\nof his neighbors. So he made a great \\nshow of looking anxiously about, as if \\nin fear of some hidden enemy. But the \\nBoar kept right on with his work. \"Why \\nare you doing that?\" asked the Fox at \\nlast with a grin. \"There is not any \\ndanger that I can see.\" \"True enough,\" \\nreplied the Boar, \"but when danger does \\ncome there will not be time for such \\nwork as this. My weapons will have to be \\nready for use then, or I shall suffer \\nfor it.\" Preparedness for war is the \\nbest guarantee of peace.", "The Stag and His Reflection \\nA Stag, drinking from a crystal spring, \\nsaw himself mirrored in the clear water. \\nHe greatly admired the graceful arch of \\nhis antlers, but he was very much \\nashamed of his spindling legs. \"How can \\nit be,\" he sighed, \"that I should be \\ncursed with such legs when I have so \\nmagnificent a crown.\" At that moment he \\nscented a panther and in an instant was \\nbounding away through the forest. But as \\nhe ran his wide-spreading antlers caught \\nin the branches of the trees, and soon \\nthe Panther overtook him. Then the Stag \\nperceived that the legs of which he was \\nso ashamed would have saved him had it \\nnot been for the useless ornaments on \\nhis head. We often make much of the \\nornamental and despise the useful.", "The Wolf in Sheep’s Clothing \\nA certain Wolf could not get enough to \\neat because of the watchfulness of the \\nShepherds. But one night he found a \\nsheep skin that had been cast aside and \\nforgotten. The next day, dressed in the \\nskin, the Wolf strolled into the pasture \\nwith the Sheep. Soon a little Lamb was \\nfollowing him about and was quickly led \\naway to slaughter. That evening the Wolf \\nentered the fold with the flock. But it \\nhappened that the Shepherd took a fancy \\nfor mutton broth that very evening, and, \\npicking up a knife, went to the fold. \\nThere the first he laid hands on and \\nkilled was the Wolf. The evil doer often \\ncomes to harm through his own deceit.", "The Ant and the Dove \\nA Dove saw an Ant fall into a brook. The \\nAnt struggled in vain to reach the bank, \\nand in pity, the Dove dropped a blade of \\nstraw close beside it. Clinging to the \\nstraw like a shipwrecked sailor to a \\nbroken spar, the Ant floated safely to \\nshore. Soon after, the Ant saw a man \\ngetting ready to kill the Dove with a \\nstone. But just as he cast the stone, \\nthe Ant stung him in the heel, so that \\nthe pain made him miss his aim, and the \\nstartled Dove flew to safety in a \\ndistant wood. A kindness is never wasted.", "The Fisherman and the Little Fish \\nA poor Fisherman, who lived on the fish \\nhe caught, had bad luck one day and \\ncaught nothing but a very small fry. The \\nFisherman was about to put it in his \\nbasket when the little Fish said: \\n\"Please spare me, Mr. Fisherman! I am so \\nsmall it is not worth while to carry me \\nhome. When I am bigger, I shall make you \\na much better meal.\" But the Fisherman \\nquickly put the fish into his basket. \\n\"How foolish I should be,\" he said, \"to \\nthrow you back. However small you may \\nbe, you are better than nothing at all.\" \\nA small gain is worth more than a large \\npromise.", "The Young Crab and His Mother \\n\"Why in the world do you walk sideways \\nlike that?\" said a Mother Crab to her \\nson. \"You should always walk straight \\nforward with your toes turned out.\" \\n\"Show me how to walk, mother dear,\" \\nanswered the little Crab obediently, \"I \\nwant to learn.\" So the old Crab tried \\nand tried to walk straight forward. But \\nshe could walk sideways only, like her \\nson. And when she wanted to turn her \\ntoes out she tripped and fell on her \\nnose. Do not tell others how to act \\nunless you can set a good example.", "The Boy and Filberts \\nA Boy was given permission to put his \\nhand into a pitcher to get some filberts. \\nBut he took such a great fistful that he \\ncould not draw his hand out again. There \\nhe stood, unwilling to give up a single \\nfilbert and yet unable to get them all \\nout at once. Vexed and disappointed he \\nbegan to cry. \"My boy,\" said his mother, \\n\"be satisfied with half the nuts you \\nhave taken and you will easily get your \\nhand out. Then perhaps you may have some \\nmore filberts some other time.\" Do not \\nattempt too much at once.", "The Kid and the Wolf \\n\"A frisky young Kid had been left by the \\nherdsman on the thatched roof of a sheep \\nshelter to keep him out of the way of \\nharm. The Kid was browsing near the edge \\nof the roof, when he spied a Wolf and \\nbegan to jeer at him, making faces and \\nabusing him to his content of his heart. \\n\"I hear you,\" said the Wolf, \"and I have \\nnot the least grudge against you for \\nwhat you say or do. When you are up \\nthere it is the roof that is talking, \\nnot you.\" Do not say anything at any \\ntime that you would not say at all times.", "The Sheep and the Pig \\nOne day as the Lion walked proudly down \\na forest aisle, and the animals \\nrespectfully made way for him, a Donkey \\nbrayed a scornful remark as he passed. \\nThe Lion felt a flash of anger. But when \\nhe turned his head and saw who had \\nspoken, he walked quietly on. He would \\nnot honor the fool with even so much as \\na stroke of his claws. Do not resent the \\nremarks of a fool. Ignore them.", "The Wolf and His Shadow \\nA Wolf left his lair one evening in fine \\nspirits and an excellent appetite. As he \\nran, the setting sun cast his shadow far \\nout on the ground, and it looked as if \\nthe wolf were a hundred times bigger \\nthan he really was. \"Why,\" exclaimed the \\nWolf proudly, \"see how big I am! Fancy \\nme running away from a puny Lion! I will \\nshow him who is fit to be king, he or \\nI.\" Just then an immense shadow blotted \\nhim out entirely, and the next instant a \\nLion struck him down with a single blow. \\nDo not let your fancy make you forget \\nrealities.", "The Boys and Frogs \\nSome Boys were playing one day at the \\nedge of a pond in which lived a family \\nof Frogs. The Boys amused themselves by \\nthrowing stones into the pond so as to \\nmake them skip on top of the water. The \\nstones were flying thick and fast and \\nthe Boys were enjoying themselves very \\nmuch. But the poor Frogs in the pond \\nwere trembling with fear. At last one of \\nthe Frogs, the oldest and bravest, put \\nhis head out of the water, and said, \\n\"Oh, please, dear children, stop your \\ncruel play! Though it may be fun for \\nyou, it means death to us!\" Always stop \\nto think whether your fun may not be the \\ncause of unhappiness of another.", "The Donkey Carrying the Image \\nA sacred Image was being carried to the \\ntemple. It was mounted on a Donkey \\nadorned with garlands and gorgeous \\ntrappings, and a grand procession of \\npriests and pages followed it through \\nthe streets. As the Donkey walked along, \\nthe people bowed their heads reverently \\nor fell on their knees, and the Donkey \\nthought the honor was being paid to \\nhimself. With his head full of this \\nfoolish idea, he became so puffed up \\nwith pride and vanity that he halted and \\nstarted to bray loudly. But in the midst \\nof his song, his driver guessed what the \\nDonkey had got into his head, and began \\nto beat him unmercifully with a stick. \\n\"Go along with you, you stupid Donkey,\" \\nhe cried. \"The honor is not meant for \\nyou but for the image you are carrying.\" \\nDo not try to take the credit to \\nyourself that is due to others.", "A Raven and a Swan \\nA Raven, which you know is black as \\ncoal, was envious of the Swan, because \\nher feathers were as white as the purest \\nsnow. The foolish bird got the idea that \\nif he lived like the Swan, swimming and \\ndiving all day long and eating the weeds \\nand plants that grow in the water, his \\nfeathers would turn white like that of \\nthe Swan. So he left his home in the \\nwoods and fields and flew down to live \\non the lakes and in the marshes. But \\nthough he washed and washed all day \\nlong, almost drowning himself at it, his \\nfeathers remained as black as ever. And \\nas the water weeds he ate did not agree \\nwith him, he got thinner and thinner, \\nand at last he died. A change of habits \\nwill not alter nature.", "The Leap at Rhodes \\nA certain man who visited foreign lands \\ncould talk of little when he returned to \\nhis home except the wonderful adventures \\nhe had met with and the great deeds he \\nhad done abroad. One of the feats he \\ntold about was a leap he had made in a \\ncity Called Rhodes. That leap was so \\ngreat, he said, that no other man could \\nleap anywhere near the distance. A great \\nmany persons in Rhodes had seen him do \\nit and would prove that what he told was \\ntrue. \"No need of witnesses,\" said one \\nof the hearers. \"Suppose this city is \\nRhodes. Now show us how far you can jump.\"\\n Deeds count, not boasting words.", "The Cock and the Jewel \\nA Cock was busily scratching and \\nscraping about to find something to eat \\nfor himself and his family, when he \\nhappened to turn up a precious jewel \\nthat had been lost by its owner. \"Aha!\" \\nsaid the Cock. \"No doubt you are very \\ncostly and he who lost you would give a \\ngreat deal to find you. But as for me, I \\nwould choose a single grain of \\nbarleycorn before all the jewels in the \\nworld.\" Precious things are without \\nvalue to those who cannot prize them.", "The Lion, the Bear, and the Fox \\nJust as a great Bear rushed to seize a \\nstray kid, a Lion leaped from another \\ndirection upon the same prey. The two \\nfought furiously for the prize until \\nthey had received so many wounds that \\nboth sank down unable to continue the \\nbattle. Just then a Fox dashed up, and \\nseizing the kid, made off with it as \\nfast as he could go, while the Lion and \\nthe Bear looked on in helpless rage. \\n\"How much better it would have been,\" \\nthey said, \"to have shared in a friendly \\nspirit.\" Those who have all the toil do \\nnot always get the profit.", "The Dogs and the Fox \\nSome Dogs found the skin of a Lion and \\nfuriously began to tear it with their \\nteeth. A Fox chanced to see them and \\nlaughed scornfully. \"If that Lion had \\nbeen alive,\" he said, \"it would have \\nbeen a very different story. He would \\nhave made you feel how much sharper his \\nclaws are than your teeth.\" It is easy \\nand also contemptible to kick a man that \\nis down.", "The Bear and the Bees \\nA Bear roaming the woods in search of \\nberries happened on a fallen tree in \\nwhich a swarm of Bees had stored their \\nhoney. The Bear began to nose around the \\nlog very carefully to find out if the \\nBees were at home. Just then one of the \\nswarm came home from the clover field \\nwith a load of sweets. Guessing what the \\nBear was after, the Bee flew at him, \\nstung him sharply and then disappeared \\ninto the hollow log. The Bear lost his \\ntemper in an instant, and sprang upon \\nthe log tooth and claw, to destroy the \\nnest. But this only brought out the \\nwhole swarm. The poor Bear had to take \\nto his heels, and he was able to save \\nhimself only by diving into a pool of \\nwater. It is wiser to bear a single \\ninjury in silence than to provoke a \\nthousand by flying into a rage.", "The Mule \\nA Mule had had a long rest and much good \\nfeeding. He was feeling very vigorous \\nindeed, and pranced around loftily, \\nholding his head high.\"My father \\ncertainly was a full-blooded racer,\" he \\nsaid. \"I can feel that distinctly.\" Next \\nday he was put into harness again and \\nthat evening he was very downhearted \\nindeed. \"I was mistaken,\" he said. \"My \\nfather was a Donkey after all.\" Be sure \\nof your pedigree before you boast of it.", "The Sick Stag \\nA Stag had fallen sick. He had just \\nstrength enough to gather some food and \\nfind a quiet clearing in the woods, \\nwhere he lay down to wait until his \\nstrength should return. The Animals \\nheard about the illness and came to ask \\nafter his health. Of course, they were \\nall hungry, and helped themselves freely \\nto the food of the Stag. And as you \\nwould expect, the Stag soon starved to \\ndeath. Good will is worth nothing unless \\nit is accompanied by good acts.", "The Fox and the Crab \\nA Crab one day grew disgusted with the \\nsands in which he lived. He decided to \\ntake a stroll to the meadow not far \\ninland. There he would find better fare \\nthan briny water and sand mites. So off \\nhe crawled to the meadow. But there a \\nhungry Fox spied him, and in a \\ntwinkling, ate him up, both shell and \\nclaw. Be content with your lot.", "The Wolves and the Sheep \\nA pack of Wolves lurked near the Sheep \\npasture. But the Dogs kept them all at a \\nrespectful distance, and the Sheep \\ngrazed in perfect safety. But now the \\nWolves thought of a plan to trick the \\nSheep. \"Why is there always this \\nhostility between us?\" they said. \"If it \\nwere not for those Dogs who are always \\nstirring up trouble, I am sure we should \\nget along beautifully. Send them away \\nand you will see what good friends we \\nshall become.\" The Sheep were easily \\nfooled. They persuaded the Dogs to go \\naway, and that very evening the Wolves \\nhad the grandest feast of their lives. \\nDo not give up friends for foes.", "The Mole and his Mother \\nA little Mole once said to his Mother: \\n\"Why, Mother, you said I was blind! But \\nI am sure I can see!\" Mother Mole saw \\nshe would have to get such conceit out \\nof his head. So she put a bit of \\nfrankincense before him and asked him to \\ntell what it was. The little Mole peered \\nat it. \"Why, that is a pebble!\" \"Well, \\nmy son, that proves you have lost your \\nsense of smell as well as being blind.\" \\nBoast of one thing and you will be found \\nlacking in that and a few other things \\nas well.", 
        "Jupiter and the Monkey \\nThere was once a baby show among the \\nAnimals in the forest. Jupiter provided \\nthe prize. Of course all the proud \\nmammas from far and near brought their \\nbabies. But none got there earlier than \\nMother Monkey. Proudly she presented her \\nbaby among the other contestants. As you \\ncan imagine, there was quite a laugh \\nwhen the Animals saw the ugly \\nflat-nosed, hairless, pop-eyed little \\ncreature. \"Laugh if you will,\" said the \\nMother Monkey. \"Though Jupiter may not \\ngive him the prize, I know that he is \\nthe prettiest, the sweetest, the dearest \\ndarling in the world.\" Mother love is \\nblind.", "The Swallow and the Crow \\nThe Swallow and the Crow had an argument \\none day about their plumage. Said the \\nSwallow: \"Just look at my bright and \\ndowny feathers. Your black stiff quills \\nare not worth having. Why do not you \\ndress better? Show a little pride!\" \\n\"Your feathers may do very well in \\nspring,\" replied the Crow, \"but—I do not \\nremember ever having seen you around in \\nwinter, and that is when I enjoy myself \\nmost.\" Friends in fine weather only, are \\nnot worth much.", "The Flies and the Honey \\nA jar of honey was upset and the sticky \\nsweetness flowed out on the table. The \\nsweet smell of the honey soon brought a \\nlarge number of Flies buzzing around. \\nThey did not wait for an invitation. No, \\nindeed. They settled right down, feet \\nand all, to gorge themselves. The Flies \\nwere quickly smeared from head to foot \\nwith honey. Their wings stuck together. \\nThey could not pull their feet out of \\nthe sticky mass. And so they died, \\ngiving their lives for the sake of a \\ntaste of sweetness. Be not greedy for a \\nlittle passing pleasure. It may destroy \\nyou.", "The Porcupine and the Snakes \\nA Porcupine was looking for a good home. \\nAt last he found a little sheltered \\ncave, where lived a family of Snakes. He \\nasked them to let him share the cave \\nwith them, and the Snakes kindly \\nconsented. The Snakes soon wished they \\nhad not given him permission to stay. \\nHis sharp quills pricked them at every \\nturn, and at last they politely asked \\nhim to leave. \"I am very well satisfied, \\nthank you,\" said the Porcupine. \"I \\nintend to stay right here.\" And with \\nthat, he politely escorted the Snakes \\nout of doors. And to save their skins, \\nthe Snakes had to look for another home. \\nGive a finger and lose a hand.", "The Old Lion \\nA Lion had grown very old. His teeth \\nwere worn away. His limbs could no \\nlonger bear him, and the King of Beasts \\nwas very pitiful indeed as he lay \\ngasping on the ground, about to die. \\nWhere now his strength and his former \\ngraceful beauty? Now a Boar spied him, \\nand rushing at him, gored him with his \\nyellow tusk. A Bull trampled him with \\nhis heavy hoofs. Even a contemptible Ass \\nlet fly his heels and brayed his insults \\nin the face of the Lion. It is cowardly \\nto attack the defenseless, though he be \\nan enemy.", "The Boy and the Nettle \\nA Boy, stung by a Nettle, ran home \\ncrying, to get his mother to blow on the \\nhurt and kiss it. \"Son,\" said the mother \\nof the Boy, when she had comforted him, \\n\"the next time you come near a Nettle, \\ngrasp it firmly, and it will be as soft \\nas silk.\" Whatever you do, do with all \\nyour might.", "The Quack Toad \\nAn old Toad once informed all his \\nneighbors that he was a learned doctor. \\nIn fact he could cure anything. The Fox \\nheard the news and hurried to see the \\nToad. He looked the Toad over very \\ncarefully. \"Mr. Toad,\" he said, \"I have \\nbeen told that you cure anything! But \\njust take a look at yourself, and then \\ntry some of your own medicine. If you \\ncan cure yourself of that blotchy skin \\nand that rheumatic gait, someone might \\nbelieve you. Otherwise, I should advise \\nyou to try some other profession.\" Those \\nwho would mend others, should first mend \\nthemselves.", "The Goatherd and the Goat \\nA Goat strayed away from the flock, \\ntempted by a patch of clover. The \\nGoatherd tried to call it back, but in \\nvain. It would not obey him. Then he \\npicked up a stone and threw it, breaking \\nthe horn of the Goat. The Goatherd was \\nfrightened. \"Do not tell the master,\" he \\nbegged the Goat. \"No,\" said the Goat, \\n\"that broken horn can speak for itself!\" \\nWicked deeds will not stay hid.\\n"]
}

export { chapters, lessons };