var request = require('request');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

var hit_count = 0;
var err_count = 0;
var sum = 0;
var avg = 0;
var latency_arr = [];

l_call = (url, repeat, frequency, duration) => {
    var work_sec = 0;
    var trial = 0;
    var myVar = setInterval(myTimer, frequency);        
    function myTimer() {        
        let current = new Date();
        request
        .get(url)
        .on('response', function(response) {      
            let latency = new Date() - current;
            latency_arr.push(latency);
            console.log("Account No: " + repeat + ", Trial No: " + trial + ", latency: " 
            + latency + " millisec");
            work_sec += frequency;
            if (work_sec >= duration){
                clearInterval(myVar);
                if (repeat == 0)
                {
                    sum = latency_arr.reduce((a,b) => {return a+b;});
                    avg = sum / latency_arr.length;
                    setTimeout(() => {
                        console.log('\x1b[36m%s\x1b[0m', `\n## Final Report - ${url} -- by chjeong\n`);                                                
                        console.log('\x1b[33m%s\x1b[0m', `Success Rate = ${((hit_count/(hit_count+err_count))*100).toFixed(2)}%\n`);
                        console.log(`\x1b[91m%s\x1b[0m`, `Average Latency = ${avg}\n`);
                        console.log(`TotalHit = ${hit_count}\nErrors = ${err_count}`);
                        return process.exit(1);
                    }, 500);                    
                }
            }
            trial++;
            hit_count++;            
        })
        .on('error', function(err) {
            console.log(err)
            err_count++;
        });        
    }    
}

rl.question('\x1b[36mUrl for benchmark:', (url) => {
    rl.question('Number of account(number of concurrent process) : ', (repeat) => {
      rl.question('Frequency(in milliseconds, 100 for 10 times in a sec) : ', (frequency) => {
        rl.question('duration(in milliseconds, 3000 for 3 seconds) : \x1b[0m', (duration) => {            
            repeat = Number(repeat);
            while (repeat-- > 0) 
                l_call(url, repeat, Number(frequency), Number(duration));                        
            rl.close();
            });
        });
    });
});