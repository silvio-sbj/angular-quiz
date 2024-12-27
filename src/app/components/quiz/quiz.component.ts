import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  title: string = '';

  questions: any;
  questionSelected: any;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  answers: string[] = [];
  answerSelected: string = '';

  finished: boolean = false;

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.questionIndex = 0;
      this.questionMaxIndex  = quiz_questions.questions.length;

      this.title = quiz_questions.title;
      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextQuestion();
  }

  nextQuestion(){
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      this.finished = true;
      if (this.answers.filter(item => (item === 'A')).length > (this.questionMaxIndex / 2))
        this.answerSelected = quiz_questions.results.A;
      else
        this.answerSelected = quiz_questions.results.B;
    }
  }
}
