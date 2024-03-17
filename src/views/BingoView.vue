<template>
  <div id="app">
    <div>
       <p style="background-color: whitesmoke">抽選カウント：{{ countNumber }}</p>
    </div>
    <v-container>
      <div class="number-container">
        <div id="drawn-number" class="number-circle" v-if="drawnNumber !== null">{{ drawnNumber }}</div>
        <div id="drawn-number" v-else style="background-color: rgba(174, 239, 186, 0.595)">抽選待ち</div>
      </div>
    </v-container>  

    <div id="buttons-container">
      <v-btn @click="startBingo" :disabled="generating">抽選</v-btn>
    </div>

    <div id="buttons-container">
      <v-btn @click="resetGame" :disabled="generating">リセット</v-btn>
    </div>

    <div id="buttons-container">
      <v-btn @click="conchShell" :disabled="generating">当選</v-btn>
    </div>

    <div id="buttons-container">
      <v-btn @click="kakutei" :disabled="generating">？</v-btn>
    </div>

    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="300"
        >
        <v-card>
          <v-card-title>
            <span class="text-h5">ルーレット チャレンジ</span>
          </v-card-title>
          <img src="../assets/katuyama.jpg">
          <v-btn color="gray" dark block @click="dialog = false">Close</v-btn>
        </v-card>

      </v-dialog>
    </v-row>

    <v-container>
      <div id="bingo-container">
      <div
        v-for="number in numbers"
        :key="number"
        :class="{ 'bingo-number': true,'selected': normalSelectedNumbers.includes(number)}"
        :style="{ backgroundColor: normalSelectedNumbers.includes(number) ? 'red' : 'white' }"
        @click="selectNumber(number)"
      >
        {{ number }}
      </div>
    </div>
    </v-container>
  </div>
</template>

<script>
import { mapWritableState } from "pinia"

import { useBingoNumbersStore } from "@/stores/bingoNumbers"

import rouletteSound from "../assets/roulette.mp3";
import horagaiSound from "../assets/horagai.mp3";

export default {
data() {
  return {
    numbers: Array.from({ length: 75 }, (_, index) => index + 1),
    generating: false,
    dialog: false,
    kakutei_flg:false
  };
},
computed: {
  ...mapWritableState(useBingoNumbersStore, [
    "countNumber",
    "drawnNumber",
    "normalSelectedNumbers",
    "selectedNumbers"
  ])
},
methods: {
  startBingo() {
    this.playRouletteSound();
    this.drawNumber();
  },
  playRouletteSound() {
    const audio = new Audio(rouletteSound);
    audio.play();
  },
  playHoragaiSound() {
    const audio = new Audio(horagaiSound);
    audio.play();
  },
  resetGame() {
    this.drawnNumber = null;
    this.selectedNumbers = [];
    this.normalSelectedNumbers = [];
    this.countNumber=0;
  },
  //当選ほら貝
  conchShell() {
    this.dialog = true;
    this.playHoragaiSound();
  },
  drawNumber() {
    const remainingNumbers = this.numbers.filter(number => !this.selectedNumbers.includes(number));
    if (remainingNumbers.length > 0) {
      this.generating = true;
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
          const drawnNumber = remainingNumbers[randomIndex];
          this.drawnNumber = drawnNumber;
        }, i * 100);
      } 
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
          const drawnNumber = remainingNumbers[randomIndex];
          this.drawnNumber = drawnNumber;
        }, i * 500);
      } 
      setTimeout(() => {
        //無理やり100を出させるロジック分岐
        if (this.kakutei_flg){
          this.drawnNumber = 100;
          this.generating = false;
          this.kakutei_flg = false;
        }else{
        //通常の抽選処理
          this.selectedNumbers.push(this.drawnNumber);
          this.normalSelectedNumbers.push(this.drawnNumber);
          this.countNumber++;
          this.generating = false;
        }
      }, 5000);

    } else {
      alert('ゲーム終了');
    }
  },
  selectNumber(number) {
    if (!this.selectedNumbers.includes(number)) {
      this.drawnNumber = number;
      this.selectedNumbers.push(number);
      this.normalSelectedNumbers.push(this.drawnNumber);
    }
  },
  kakutei(){
    this.kakutei_flg = true;
    this.startBingo();
  }
},
watch: {
  selectedNumbers() {
    this.drawnNumber = null;
  },
},
};
</script>

<style>
#app {
display: flex;
flex-wrap: wrap;
text-align: center;
background-image: url("../assets/forest.jpg");
background-position: center; /* 画像を中央に配置 */
background-size:cover;
min-height: 90vh; /* ページ全体を画像でカバー */
}

#drawn-number {
font-size: 50px;
}

.number-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.number-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  background-color: white;
}

#buttons-container {
display: flex;
justify-content: space-between;
margin: 10px;
}

#bingo-container {
display: flex;
flex-wrap: wrap;
justify-content: center;
}

.bingo-number {
width: 40px;
height: 35px;
margin: 5px;
display: flex;
align-items: center;
justify-content: center;
border: 1px solid #ccc;
cursor: pointer;
}

.selected {
background-color: red;
color: white;
}

@media (min-width: 1200px) {
#bingo-container {
  max-width: 800px;
}
}
</style>