function getGrade(mark) {
    if (mark > 79) {
        return 'A';
    } else if (mark > 69) {
        return 'B';
    } else if (mark > 59) {
        return 'C';
    } else if (mark > 49) {
        return 'D';
    } else {
        return 'F';
    }
}



console.log(`The student's grade is: ${getGrade(studentMark)}`);