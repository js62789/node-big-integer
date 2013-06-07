var bigint = require('./big-integer');

console.log('Max integer: ' + Number.MAX_VALUE);

console.log('Adding', bigint.add("99999999999999", "9999999"));

console.log('Adding Many', bigint.add("1000", "900", "99"));

console.log('Multiply', bigint.multiply("11", "11"));

console.log('Multiply Many', bigint.multiply("11", "11", "11"));

console.log('Max', bigint.max("1000", "900", "1234", "9999"));

console.log('Min', bigint.min("1000", "900", "1234", "9999"));

console.log('Power', bigint.pow("11", "11"));