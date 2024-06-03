const mysql = require('mysql2');
const randomstring = require('randomstring');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1011',
  database: 'dream_or_reality_db'
});


// 로그인 라우터
exports.login = (req, res) => {
  const { id, pw } = req.body;

  const sql = 'SELECT id, UserId FROM user WHERE id = ? AND pw = ?';
  connection.query(sql, [id, pw], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ error: '잘못된 자격 증명' });
      return;
    }
    const userData = {
      UserId: result[0].UserId
    };
    res.status(200).json(userData);
  });
};

// 이름 불러오는 라우터
exports.getUserName = (req, res) => {
  const { UserId } = req.body;

  const sql = 'SELECT name FROM user WHERE UserId = ?';

  connection.query(sql, [UserId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: '데이터를 찾을 수 없습니다.' });
    }

    return res.status(200).json({
      name: result[0].name
    });
  });
};

// 프로젝트 저장 컨트롤러
exports.saveProjects = (req, res) => {
  const { UserId, title, deadline, content, recurit } = req.body;
  const sql = 'INSERT INTO projects (UserId, title, deadline, content, recurit) VALUES (?, ?, ?, ?, ?)';

  connection.query(sql, [UserId, title, deadline, content, recurit], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }
    return res.status(200).json({message:'프로젝트를 성공적으로 저장했습니다.'});
  });
};

// 회고록 저장 컨트롤러
exports.saveMemoir = (req, res) => {
  const { UserId, date, content} = req.body;
  const sql = 'INSERT INTO memoir (UserId, date, content) VALUES (?, ?, ?)';

  connection.query(sql, [UserId, date, content], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '오류가 발생했습니다.' });
    }
    return res.status(200).json({message:'프로젝트를 성공적으로 저장했습니다.'});
  });
};


