const express = require('express');
const apiRouter = require('./api');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: true,
    credentials: true,
    methods: 'POST,GET,PUT,OPTIONS,DELETE'
}));

app.use(express.json());
app.use(apiRouter);

app.set('json replacer', (key, value) => {
    if (key === 'password') { return undefined; }
    return value;
})

app.use((err, req, res) => {
    console.error(err);
})
    
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server: Listening on ${process.env.PORT || 3000}`);
});