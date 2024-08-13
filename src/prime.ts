/**
 * Determines if the given number is prime
 * @param n a positive integer whose primality you want to check
 * @returns true if n is prime and false otherwise
 */
export const isPrime = (n: bigint): boolean => {
  if (n < 1n) {
    throw new Error('n must be positive');
  } else if (n === 1n) {
    return false;  // by definition
  } else {
    return isPrimeHelper(n, n - 1n);
  }
};

/**
 * Checks whether n is divisible by any integer from m down to 2
 * @param n a positive integer whose divisibility you want to check
 * @returns true if n is *not* divisible by any integer from m down to 2
 */
const isPrimeHelper = (n: bigint, m: bigint): boolean => {
  if (m < 2n) {
    return true;   // no left numbers to check
  } else if (n % m === 0n) {
    return false;  // divisible by this number
  } else {
    return isPrimeHelper(n, m - 1n);  // not this one, but check m-1..2
  }
};


/**
 * Returns the number of integers from 1 to n that divide n evenly.
 * @param n a positive number whose number of divisors you want
 * @returns the number of integers from 1 .. n that divide n
 */
export const numDivisors = (n: bigint): bigint => {
  if (n < 1n) {
    throw new Error('n must be positive');
  } else {
    return numDivisorsHelper(n, n);
  }
};

/**
 * Returns the number of integers from 1 to m that divide n evenly.
 * @param n a positive number whose number of divisors you want
 * @returns the number of integers from 1 .. m that divide n
 */
const numDivisorsHelper = (n: bigint, m: bigint): bigint => {

  if (m === 0n){
    return 0n;
  }
  else{
    const remain = n % m;
    const count = remain === 0n ? 1n : 0n;
    return count + numDivisorsHelper(n, m-1n);
  }
  
};


/** 
 * Returns the maximnum number of divisors for any integer from 1 to n.
 * @param n a positive number
 * @returns the maximum number of divisors for any integer from 1 to n
 */
export const maxNumDivisors = (n: bigint): bigint => {
  if (n < 1n) {
    throw new Error('n must be positive');
  } else if (n === 1n) {
    return 1n;
  } else {
    const divisorN = numDivisors(n);
    const maxDivisor = maxNumDivisors(n - 1n);

    return divisorN > maxDivisor  ? divisorN : maxDivisor;
  }
};


/**
 * Determines if the given integer is highly composite
 * @param n a positive integer whose primality you want to check
 * @returns true if n is highly composite and false otherwise
 */
export const isHighlyComposite = (n: bigint): boolean => {
  if (n < 1n) {
    throw new Error('n must be positive');
  } else if (n == 1n) {
    return true;
  } else {
    return numDivisors(n) > maxNumDivisors(n-1n);
  }
};
