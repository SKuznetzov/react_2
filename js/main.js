kaboom({
    global: true,
    fullscreen: 1,
    scale: 1,
    debug: true,
    background: [ 0, 0, 255, ],
})

const MOVE_SPEED = 120
const JUMP_FORCE = 360

loadSprite('coin', 'coin.png')
loadSprite('evil-shroom','evel-shroom.png')
loadSprite('brick', 'brick.png')
loadSprite('block','block.png')
loadSprite('mario', 'mario.png')
loadSprite('mushroom', 'mushroom.png')
loadSprite('surprise', 'surprise.png')
loadSprite('unboxed', 'unboxed.png')
loadSprite('pipe-top-left', 'pipe-top-left.png')
loadSprite('pipe-top-right', 'pipe-top-right.png')
loadSprite('pipe-bottom-left', 'pipe-bottom-left.png')
loadSprite('pipe-bottom-right', 'pipe-bottom-right.png')

scene("game", () => {
  layers(['bg', 'obj', 'ui'], 'obj')


const gap = 
      [
    '                                      ',
    '                                      ',
    '                                      ',
    '                                      ',
    '                                      ',
    '         %  =*=%=                             ',
    '                                      ',
    '                             -+        ',
    '                       ^  ^  ()               ',
    '===============================   =====         ',
  ]
    // [
    //   '£                                       £',
    //   '£                                       £',
    //   '£                                       £',
    //   '£                                       £',
    //   '£                                       £',
    //   '£        @@@@@@              x x        £',
    //   '£                          x x x        £',
    //   '£                        x x x x  x   -+£',
    //   '£               z   z  x x x x x  x   ()£',
    //   '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
    // ]
  

  const levelCfg = {
    width: 20,
    height: 20,
    '=': () => [sprite('brick'),area(),solid()],
    '$': () => [sprite('coin'),area()],
    '%': () => [sprite('surprise'),area(),solid(),'coin-surprise'],
    '*': () => [sprite('surprise'),area(),solid(),'mushroom-surprise'],
    '}': () => [sprite('unboxed'),area(),solid()],
    '(': () => [sprite('pipe-bottom-left'),area(),solid(),scale(0.5)],
    ')': () => [sprite('pipe-bottom-right'),area(),solid(),scale(0.5)],
    '-': () => [sprite('pipe-top-left'),area(),solid(),scale(0.5)],
    '+': () => [sprite('pipe-top-right'),area(),solid(),scale(0.5)],
    '^': () => [sprite('evil-shroom'),area(),solid()],
    '#': () => [sprite('mushroom'),area(),solid()],
  }
  
  const gameLevel = addLevel(gap, levelCfg)

  let score = 0

  const scoreLabel = add([
    text(score),
    pos(30,6),
    layer('ui'),
    {
      value: score,
    }
  ])

  add([text('level ' + 'test', pos(4,6))])

  function big() {
    let timer = 0
    let isBig = false
    return {
      update() {
        if (isBig) {
          timer -=dt()
          if (timer <= 0) {
            this.smallify()
          }
        }
      },
      isBig() {
        return isBig
      },
      smallify() {
        this.scale = vec2(1)
        timer = 0
        isBig = false
      },
      biggify(time) {
        this.scale = vec2(2)
        timer = time
        isBig = true
      }
    }
  }

  const player = add([
    sprite('mario'),area(),solid(),
    pos(30,0),
    body(),
    big(),
    origin('bot')
  ])

  player.on("headbump", (obj) => {
    if (obj.is('coin-surprise')) {
      gameLevel.spawn('$', obj.gridPos.sub(0,1))
      destroy(obj)
    }
  })
  onKeyDown('left', () => {
    player.move(-MOVE_SPEED,0)
  })

  onKeyDown('right', () => {
    player.move(MOVE_SPEED,0)
  })

  onKeyPress('space', () => {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
    }
  })





})
go("game")








