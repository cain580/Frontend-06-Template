
class Role{
    constructor(property = {}){
        this.basics = Object.assign({
            // 血量
            HP: 100,
            // 攻击力
            ATK: 10,
            // 装备
            equip: {}
        },property)
    }
    get hp(){
        return this.basics.HP;
    }
    getATK(attackName){
        //let {equip, ATK} = this.basics;
        return {
            attackName: attackName,
            basics: this.basics
        }
    }
    hurt(role){
        let _this = this.basics;
        let other = role.basics;
        let attackName = role.attackName;
        // 演示就不添加装备增加的攻击力了
        _this.HP = _this.HP - other.ATK;
        console.log(`名字叫${_this.name}的${_this.type}受到了${other.name}的< ${attackName} >攻击，HP-${other.ATK}`);
        console.log(`${_this.name}当前HP：${_this.HP}`);
    }
}

class Dog extends Role{
    constructor(property = {}){
       super(Object.assign({
           type:"Dog",
           HP: 100,
           ATK: 10,
       },property))
    }
    // 咬击
    bite(target){
        target.hurt(this.getATK("咬击"))
    }
}

class Person extends Role{
    constructor(property = {}){
        super(Object.assign({
            type:"Person",
            HP: 1000,
            ATK: 30,
        },property))
    }
    // 脚踢
    spurn(target){
        target.hurt(this.getATK("脚踢"))
    }

}

const dog = new Dog({name:"卡拉"});
const person = new Person({name:"厨师"});
dog.bite(person);
person.spurn(dog);

console.log(dog.hp,person.hp)