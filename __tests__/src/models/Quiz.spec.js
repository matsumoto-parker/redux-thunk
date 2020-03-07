import Quiz from '../../../src/models/Quiz';

const createMockQuiz = () => {
  return {
    question: 'クイズの問題',
    correctAnswer: '答え',
    incorrectAnswers: [
      '不正解1',
      '不正解2',
      '不正解3',
    ],
  }
};

describe('Quizクラスのテスト', () => {
  it('importチェック', () => {
    expect(typeof Quiz).toStrictEqual('function');
  });

  describe('インスタンスメソッド', () => {
    describe('constructor', () => {
      it('コンストラクタで渡した値をプロパティに保持', () => {
        const quizData = createMockQuiz();
        const quiz = new Quiz(quizData);

        expect(quiz._question).toStrictEqual(quizData.question);
        expect(quiz._correctAnswer).toStrictEqual(quizData.correctAnswer);
        expect(quiz._incorrectAnswers).toStrictEqual(quizData.incorrectAnswers);
      });
    });
  });

  describe('getter', () => {
    it('questionとcorrectAnswerのgetterが使える', () => {
      const quizData = createMockQuiz();
      const quiz = new Quiz(quizData);

      expect(quiz.question).toStrictEqual(quizData.question);
      expect(quiz.correctAnswer).toStrictEqual(quizData.correctAnswer);
      expect(quiz.incorrectAnswers).toStrictEqual(quizData.incorrectAnswers);
    });
  });

  describe('shuffleメソッド', () => {
    it('シャッフルされる', () => {
      const quizData = createMockQuiz();
      const quiz = new Quiz(quizData);

      const shuffleAnswers1 = quiz.shuffleAnswers();
      const shuffleAnswers2 = quiz.shuffleAnswers();
      expect(shuffleAnswers1).not.toStrictEqual(shuffleAnswers2);
    });
  });

  describe('judgeCorrectAnswerメソッド', () => {
    it('引数の値が正解ならtrue,不正解ならfalseが返る', () => {
      const quizData = createMockQuiz();
      const quiz = new Quiz(quizData);

      expect(quiz.judgeCorrectAnswer(quizData.correctAnswer)).toStrictEqual(true);
      
      quizData.incorrectAnswers.forEach(incorrectAnswer => {
        expect(quiz.judgeCorrectAnswer(incorrectAnswer)).toStrictEqual(false);
      });
    });
  });

  describe('クラスメソッド', () => {
    describe('fetchAndQuizzesメソッド', () => {
      it('10件のQuizインスタンスが返る', async () => {
        const quizzes = await Quiz.fetchAndCreateQuizzes();

        expect( Array.isArray(quizzes) ).toStrictEqual(true);
        expect(quizzes.length).toStrictEqual(10);
        quizzes.forEach(quiz => {
          expect( quiz instanceof Quiz ).toStrictEqual(true);
        });
      });
    });

    describe('createQuizInstanceWithDataメソッド', () => {
      it('指定されたデータ形式でデータを渡すとQuizインスタンスのリストを返す', () => {
        const quizFactory = () => {
          return {
            question: '問題',
            correct: '解答',
            incorrect_answers: [
              '不正解1',
              '不正解2',
              '不正解3'
            ]
          }
        };
  
        const dummyQuizDataList = [
          quizFactory(),
          quizFactory(),
          quizFactory()
        ];
  
        const quizzes = Quiz.createQuizInstancesWithData(dummyQuizDataList);
  
        expect( Array.isArray(quizzes) ).toStrictEqual(true);
        expect(quizzes.length).toStrictEqual(dummyQuizDataList.length);
        quizzes.forEach(quiz => {
          expect( quiz instanceof Quiz ).toStrictEqual(true);
        });
      });
    });
  });






  

});