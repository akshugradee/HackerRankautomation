//import puppeteer 
const puppeteer=require('puppeteer');
const email='Akshaygrade05@gmail.com';
const password='Agradee';
const codeObj=require('./code');
//let ctrlkey=process.platform==='darwin'?'Meta':"Control";

const loginlink='https://www.hackerrank.com/auth/login';
 
let browserOpen=puppeteer.launch({
    headless:false,
    args:['--start-maximized'], //browser in full screen
    defaultViewport:null
})
let page;
browserOpen.then(function(browserObj){
    let browserOpenPromise=browserObj.newPage();
    return browserOpenPromise;
}).then(function(newtab){
        page=newtab;
        let hackerrankOpenPromise=newtab.goto(loginlink);
        return hackerrankOpenPromise;
}).then(function(){
    let emailEnteredpromise=page.type(`input[id="input-1"]`,email,{delay:50});
    return emailEnteredpromise;
}).then(function(){
    let passwordEnteredPromise=page.type(`input[type="password"]`,password,{delay:50});
    return passwordEnteredPromise;
}).then(function(){
    let loginpagePromise=page.click(`.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled`,{delay:50});
    return loginpagePromise;
}).then(function(){
    
    let clickalgoPromise=waitAndclick(`.topic-card a[data-attr1="algorithms"]`,page);
    return clickalgoPromise;

}).then(function(){
    let warmupclickPromise=waitAndclick(`input[value="warmup"]`,page);
    return warmupclickPromise;
}).then(function(){
    let waitforseconds=page.waitFor(300);
    return waitforseconds;
}).then(function(){
    let warmupQuestion=page.$$( `.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled`,{delay:50})//document.queryselector()=$ and $$ =.all  add one more
        return warmupQuestion;  
}).then(function(questionsArr){
    console.log("number of question : ",questionsArr.length);
    let questionwillbesolved=questionsolver(page,questionsArr[0],codeObj.answer[0]);
    return questionwillbesolved;
})

//wait for particular element after directing into a page or reloading a page before that we can get error because 
// website or pagereloading sometimes take some times to reload or directing to a particular part.

function waitAndclick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitformodelPromise=cpage.waitForSelector(selector);
        waitformodelPromise.then(function(){
            let clickModel=cpage.click(selector);
            return clickModel;
        }).then(function(){
            
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

function questionsolver(page,question,answer){
    return new Promise(function(resolve,reject){
        //task here question come and click jisey body 
        let questionclickedPromise=question.click();
         questionclickedPromise.then(function(){
             let editorPromise=waitAndclick('.monaco-editor.no-user-select.mac.vs',page);
             return editorPromise;


         }).then(function(){
             let customInput = waitAndclick('.checkbox-input',page);
             return customInput;
         }).then(function(){
             //focus on text box
                 return page.waitForSelector('textarea.custominput',page);             
         }).then(function(){
             return page.type('textarea.custominput',answer,{delay:10});

         }).then(function(){
             //cut from input text aarea
             let ctrlispressed=page.keyboard.down('Meta');
             return ctrlispressed;
         }).then(function(){
             let Aispressed=page.keyboard.press('A');
             return Aispressed;
         }).then(function(){
             let Xispressed=page.keyboard.press('X');
             return Xispressed;
         }).then(function(){
            let CtrlisUnpressed=page.keyboard.up(ctrlkey);
            return CtrlisUnpressed;
        }).then(function(){
            let mainEditorpress=waitAndclick('.monaco-editor.no-user-select.mac.vs',page);
            return mainEditorpress
        }).then(function(){
           //cut from input text aarea
           let ctrlispressed=page.keyboard.down(ctrlkey);
           return ctrlispressed;
       }).then(function(){
           let Aispressed=page.keyboard.press('A');
           return Aispressed;
       }).then(function(){
           let Vispressed=page.keyboard.press('V');
           return Vispressed;
       }).then(function(){
           let CtrlisUnpressed=page.keyboard.up(ctrlkey);
           return CtrlisUnpressed;
       }).then(function(){
           return page.click('.hr-monaco__run-code');
       }).then(function(){
           resolve();
       }).catch(function(err){
           reject();
       })
    })
}
