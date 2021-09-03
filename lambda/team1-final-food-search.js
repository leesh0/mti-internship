const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()
const tableName = 'Team1Nutrition'

const testData = [
  {
    name: 'Lexus',
    p: 80,
    c: 95,
    f: 85,
    kcal: 9431,
  },
  {
    name: 'Fillmore',
    p: 5,
    c: 24,
    f: 89,
    kcal: 9914,
  },
  {
    name: 'Buick',
    p: 97,
    c: 84,
    f: 91,
    kcal: 4743,
  },
  {
    name: 'Pontiac',
    p: 50,
    c: 86,
    f: 34,
    kcal: 964,
  },
  {
    name: 'Ford',
    p: 92,
    c: 26,
    f: 1,
    kcal: 284,
  },
  {
    name: 'Porsche',
    p: 66,
    c: 68,
    f: 89,
    kcal: 1929,
  },
  {
    name: 'Chevrolet',
    p: 65,
    c: 37,
    f: 87,
    kcal: 8920,
  },
  {
    name: 'Ford',
    p: 62,
    c: 92,
    f: 52,
    kcal: 9322,
  },
  {
    name: 'Ferrari',
    p: 50,
    c: 92,
    f: 56,
    kcal: 2491,
  },
  {
    name: 'Lotus',
    p: 64,
    c: 70,
    f: 46,
    kcal: 3623,
  },
]

exports.handler = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ message: '' }),
  }

  const querys = event.queryStringParameters

  //TODO: 取得したいテーブル名をparamオブジェクトに設定する（中身を記述）
  const param = {}

  // data later
  const result = testData.filter((e) => {
    return e.name.includes(querys.q)
  })

  response.body = JSON.stringify({
    data: result,
  })
  callback(null, response)
  return
  //dynamo.scan()で全件取得
  dynamo.scan(param, function(err, data) {
    if (err) {
      response.statusCode = 500
      response.body = JSON.stringify({
        message: '予期せぬエラーが発生しました',
      })
      callback(null, response)
      return
    }

    //TODO: 全ユーザのpasswordを隠蔽する処理を記述

    //TODO: レスポンスボディの設定とコールバックの記述
  })
}
