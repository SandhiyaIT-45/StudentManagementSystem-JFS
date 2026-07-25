package com.studentmanagementsystem.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.studentmanagementsystem.model.Student;
import com.studentmanagementsystem.repository.StudentRepository;
@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(int id){
        return studentRepository.findById(id).orElse(null);
    }
    public Student updateStudent(int id, Student student) {
    Student existingStudent = studentRepository.findById(id).orElse(null);

    if (existingStudent != null) {
        existingStudent.setName(student.getName());
        existingStudent.setAge(student.getAge());
        existingStudent.setDepartment(student.getDepartment());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setMarks(student.getMarks());

        return studentRepository.save(existingStudent);
    }

    return null;
}
public void deleteStudent(int id){
    studentRepository.deleteById(id);
}
}
