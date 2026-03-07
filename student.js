const students = [
  { name: "Alice",   marks: 75 },
  { name: "Bob",     marks: 35 },
  { name: "Charlie", marks: 90 },
  { name: "Diana",   marks: 55 },
  { name: "Eve",     marks: 82 },
];


//Q1: Return names of all students in uppercase

console.log(students.map(stud=>stud.name.toUpperCase()))

//Q2: Return details of students who scored more than 60
console.log(students.filter(stud=>stud.marks > 60))
//Q3: Total marks — add 20 to those below 60, then sum everyone above 60
console.log(students.filter(stud=>{
    if(stud.marks < 60)
        stud.marks+=20
    return stud
}).filter((stud) => stud.marks > 60).reduce((acc,curr) => acc + curr.marks,0))


