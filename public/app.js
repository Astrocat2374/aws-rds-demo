const name = document.querySelector('#post-name');
const grade = document.querySelector('#post-grade');
const submit = document.querySelector('#post-submit');

submit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(name.value);
    console.log(grade.value);
    axios
        .post(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/post`, {
            name: name.value,
            grade: grade.value
        })
        .catch((error)=>{
            console.log('error', error);
        })
})

axios
    .get(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/get`)
    .then((response)=>{
        console.log('get response', response.data.message.rows)
        const render = (response.data.message.rows).map(x=>{
            console.log('x', x);
            let cardTemplate = `
            <div class = 'card'>
                <p> ${x.name} </p>
                <p> ${x.grade} </p>
            </div>
            `
            let newCard = document.createElement('div');
            newCard.innerHTML = cardTemplate;
            document.querySelector('#result').appendChild(newCard);
        })
    })
    .catch((error)=>{
        console.log('error', error);
    })