function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundsSinceSA: 3,
      winner: null,
      battleLog: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: `0%` };
      } else {
        return { width: `${this.monsterHealth}%` };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: `0%` };
      } else {
        return { width: `${this.playerHealth}%` };
      }
    },
    specialAttackAvailable() {
      return this.roundsSinceSA >= 3;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'player';
      }
    },
  },
  methods: {
    attackMonster() {
      this.roundsSinceSA++;
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.addLogMessage('Player', 'Attack', damage);
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.addLogMessage('Monster', 'Attack', damage);
    },
    specialAttackMonster() {
      this.roundsSinceSA = 0;
      const damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.addLogMessage('Player', 'Special Attack', damage);
      this.attackPlayer();
    },
    healPlayer() {
      this.roundsSinceSA++;
      let healAmount = getRandomValue(8, 20);
      healAmount = this.playerHealth + healAmount > 100 ? 100 - playerHealth : healAmount;
      this.playerHealth += healAmount;
      this.addLogMessage('Player', 'Heal', healAmount);
      this.attackPlayer();
    },
    resetGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
      this.roundsSinceSA = 3;
      this.battleLog = [];
    },
    surrender() {
      this.winner = 'monster';
    },
    addLogMessage(who, what, quantity) {
      this.battleLog.unshift({ actionBy: who, actionType: what, actionValue: quantity });
    },
  },
});

app.mount('#game');
