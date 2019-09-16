'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '正しいのはどれ？', c: ['コアラはユーカリしか食べない。', 'パンダはユーカリしか食べない。', 'コアラはパンダしか食べない。']},
    {q: 'キリンの睡眠時間はどれくらい？', c: ['20分', '20時間', '８時間']},
    {q: 'ワイシャツの名前の由来はどれ？', c: ['ホワイトシャツがなまったもの', 'スーツなどの襟元がＹの形をした服といっしょに着ることが多いから', 'ワイシャツを作っていた会社のイニシャルがＹだったから']},
    {q: 'カステラの名前の由来はどれ？', c: ['スペインのカスティーリャ地方のお菓子だから', 'バッテラに見た目が似ているお菓子だから（菓子＋バッテラ＝カステラ）', 'ポルトガル語で甘いという意味']},
    {q: '話の「さわり」とは？', c: ['話のメインの部分', '話の最初の部分', '話の最後の部分']},
    {q: '中国語で「手紙」とは何のこと？', c: ['トイレットペーパー', 'ティッシュペーパー', '切手']},
    {q: '根役者を英語でいうと何役者？', c: ['ハム役者', 'キャロット役者', 'チーズ役者']},
    {q: '安全第一のつづき、第二は何？', c: ['品質', '生産', '利益']},
    {q: '魚のタラはギリシャ語で何という？', c: ['バカヤロウ', 'マヌケヤロウ', 'トンチンカン']},
    {q: 'チャックは何語？', c: ['日本語', 'ポルトガル語', '英語']},
    {q: 'つぎのうちで略語なのはどれ？', c: ['ピアノ', 'バイオリン', 'ギター']},
    {q: '本屋にいるとお手洗いに行きたくなる現象の名前は？', c: ['青木まりこ現象', '赤木まりこ現象', '黒木まりこ現象']},
  ]);

  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

function checkAnswer(li){
  if(isAnswered === true){
    return;
  }
  isAnswered = true;

  if (li.textContent === quizSet[currentNum].c[0]){
    li.classList.add('correct');
    score++;
  } else {
    li.classList.add('wrong');
  }

  btn.classList.remove('disabled');
}

function setQuiz(){
  isAnswered = false;

  question.textContent = quizSet[currentNum].q;

  while (choices.firstChild) {
  choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choise => {
    const li = document.createElement('li');
    li.textContent = choise;
    li.addEventListener('click', () => {
      checkAnswer(li);
    })
    choices.appendChild(li);
  });

  if(currentNum === quizSet.length -1){
    btn.textContent = 'Show Score';
  }
}

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')){
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length -1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `得点: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
