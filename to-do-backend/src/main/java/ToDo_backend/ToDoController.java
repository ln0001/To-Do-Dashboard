package ToDo_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "https://todoproject-three-lemon.vercel.app")
public class ToDoController {
    @Autowired
    private final ToDoService service;

    public ToDoController(ToDoService service) {
        this.service = service;
    }

    @GetMapping
    public List<ToDo> getAllList(){
        return service.getAll();
    };

    @PostMapping
    public ResponseEntity<String>  create(@RequestBody ToDo todo){
        ToDo list =  service.create(todo);
        if(list != null){
            return ResponseEntity.ok("list created successfully");
        }else{
            return ResponseEntity.badRequest().body("List not created");
        }
    }

    @GetMapping("/{id}")
    public ToDo getOne(Long id){
        return service.getById(id);
    }

    @PutMapping("/update/{id}")
    public ToDo update(@PathVariable Long id, @RequestBody ToDo toDoData){
        return service.updateData(id, toDoData);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.deleteOne(id);
    }

}
