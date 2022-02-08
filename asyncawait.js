//promises --Promises are used to handle asynchronous operations in JavaScript. 
// They are easy to manage when dealing with multiple asynchronous operations where callbacks can create callback hell leading to unmanageable code. 
// Prior to promises events and callback functions were used but they had limited functionalities and created unmanageable code. 
//Multiple callback functions would create callback hell that leads to unmanageable code.

// async await  -->  aysnc is keyword So the async keyword is added to functions to tell them to return a promise rather than directly returning the value 
//  There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”.

// The word “async” before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.
// So, async ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There’s another keyword, await, that works only inside async functions, and it’s pretty cool.

// The keyword await makes JavaScript wait until that promise settles and returns its result.


const puppeteer = require('puppeteer');

const email = '@xyx.com';
const password = '---';
const loginlink = 'https://www.hackerrank.com/auth/login'; 

//question solution  is in this file
const codeObj=require('./code');


let cpage;
// creating  iffe - immeditaly invoked function expression - function declare, define and invoke at same place

(async function () {
    try {
        //open browser 
        let browserOpen = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        })
        //new apge
        let newtab = await browserOpen.newPage();
        //go to login page
        await newtab.goto(loginlink);
        //for entering email id
        await newtab.type(`input[id="input-1"]`, email, { delay: 50 });
        // for password 
        await newtab.type(`input[type="password"]`, password, { delay: 50 });
        //clicking sumbit button
        await newtab.click(`.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled`, { delay: 50 });
        //now we  have move to new page so we have to wait for load and then continue the activity 
        await waitandclick(`.topic-card a[data-attr1="algorithms"]`, newtab);

        await waitandclick(`input[value="warmup"]`,newtab);
        
        //need to know how many question
            //$$-query selector for all the element
        let totalquestionArr = await newtab.$$(`.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled`,{delay:40});
        console.log("question on warmup",totalquestionArr.length);
        // solving the question from code.js
        await questionsolver(totalquestionArr[0],newtab,codeObj.answer[0]);
    } catch (error) {
        console.log(error);
    }

})() //-->allig here 


//wating for selector and then click on algopage
async function waitandclick(selector, cpage) {


    await cpage.waitForSelector(selector);

    let selectorClick = cpage.click(selector);
    return selectorClick;
}

//solving the question

async function questionsolver(question,page,answer){
    //click the question
    await question.click()
//    clicking editior
    await waitandclick('.monaco-editor.no-user-select.vs',page);
    await waitandclick('.checkbox-input',page);
    await page.type('textarea.custominput',answer,{delay:10});
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.press('x');
    await page.keyboard.up('Control');

    await waitandclick('.monaco-editor.no-user-select.vs',page);
    await page.keyboard.down('Control');
    await page.keyboard.press('a');
    await page.keyboard.press('v');
    await page.keyboard.up('Control');
    await waitandclick('.hr-monaco__run-code',page);
    


}
