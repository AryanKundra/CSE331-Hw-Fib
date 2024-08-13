import React from 'react';
import { createRoot } from 'react-dom/client';
import { fib, nextFib } from './fib';
import { isHighlyComposite, isPrime } from './prime';


const main: HTMLElement | null = document.getElementById('main');

const isPrimeMes = (age:number): string => {
  const ageBigInt = BigInt(age);
  const resPrime = isPrime(ageBigInt);
  return resPrime ? 'Your age is also prime!' : '';
};

const HighCompMes = (age: number) : string =>{
  const ageBigInt = BigInt(age);
  const isHighCompRes = isHighlyComposite(ageBigInt);
  return isHighCompRes ? 'Your age is also highly composite' : '';
}

if (main === null) {
  console.log('Uh oh! no "main" element!');
} else {
  const root = createRoot(main);
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const firName : string | null = params.get('firstName');
  const ageStr: string | null = params.get('age');

  if (firName === null || ageStr === null || firName.trim() === ''|| ageStr.trim() === ''){
    root.render(<form action="/">
    <p>Hi there! Please enter the following information:</p>
    <p>Your first name: <input type="text" name="firstName"></input></p>
    <p>Your age: <input type="number" name="age" min="0"></input></p>
    <input type="submit" value="Submit"></input>
    </form>);
  }else if (ageStr === null){
    root.render(<p> Error: Age is invalid, please provide a valid age</p>)
  }else{
    const age: number = parseInt(ageStr);
    if (age < 0){
      root.render(<p>Error: Invalid age, age  cannot be negative</p>)
    } else{
      const ageBigInt = BigInt(age);
      const isFibonacci = fib(ageBigInt) === ageBigInt || nextFib(ageBigInt) === ageBigInt;
      const text = isFibonacci
       ? `Hi, ${firName}! your age (${age}) is a Fibonacci number!${isPrimeMes(age)}${HighCompMes(age)}`
  : `Hi, ${firName}! Your age (${age}) will be a Fibonacci number in ${nextFib(ageBigInt) - ageBigInt} years.${isPrimeMes(age)}${HighCompMes(age)}`;
      root.render(
        <>
      <p>{text}</p>
      <a href="/">Start Over</a>
      </>);
    }
  }
}

