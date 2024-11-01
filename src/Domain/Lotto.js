import { BASIC_ERROR } from '../Constants/Message.js';
import { LOTTO_NUMBER_STANDARD, WINNER } from '../Constants/Constant.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO_NUMBER_STANDARD.length) {
      throw new Error(BASIC_ERROR.invalidLength);
    }
  }

  printLottoNumbers() {
    Console.print(`[${this.#numbers.join(', ')}]`);
  }

  calculateWinningLotto(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number))
      .length;
  }
  compareMatchNumber(matchNumberCount, bonusNumber) {
    const resultTable = {
      [WINNER.firstWinner.match]: WINNER.firstWinner.rank,
      [WINNER.secondWinner.match]: this.#numbers.includes(bonusNumber)
        ? WINNER.secondWinner.rank
        : WINNER.thirdWinner.rank,
      [WINNER.fourthWinner.match]: WINNER.fourthWinner.rank,
      [WINNER.fifthWinner.match]: WINNER.fifthWinner.rank,
    };

    return resultTable[matchNumberCount] || WINNER.losing_ticket.rank;
  }

  calculateLottoResult(winningNumbers, bonusNumber) {
    const matchNumberCount = this.calculateMatchNumber(winningNumbers);
    const result = this.compareMatchNumber(matchNumberCount, bonusNumber);
    return result;
  }
}

export default Lotto;
