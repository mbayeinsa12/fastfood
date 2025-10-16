package sn.bdk.manssi.resource;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import sn.bdk.manssi.model.Response;
import sn.bdk.manssi.model.Todo;
import sn.bdk.manssi.service.TodoService;

import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.util.Map;

@RestController
// URL de base de ce controller
@RequestMapping("/api/v1/todos")
@RequiredArgsConstructor
@Tag(name = "todos")
public class TodoResource {

    private final TodoService todoService;

    @PostMapping("/save")
    public ResponseEntity<Response> saveTodo(@RequestBody @Valid Todo alert) throws UnsupportedEncodingException {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(Instant.now().getEpochSecond())
                        .data(Map.of("item", todoService.create(alert)))
                        .message("Tâche enregistrée avec succès")
                        .status(CREATED)
                        .statusCode(CREATED.value())
                        .build()
        );
    }

    @GetMapping("")
    public ResponseEntity<Response> getAllTodos() throws InterruptedException {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(Instant.now().getEpochSecond())
                        .data(Map.of("items", todoService.list()))
                        .message("La liste des tâches")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Response> deleteTodos(@PathVariable Long id) throws InterruptedException {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(Instant.now().getEpochSecond())
                        .data(Map.of("items", todoService.delete(id)))
                        .message("Suppression de la tâche avec succès")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }


    @DeleteMapping("isep/delete/{id}")
    public ResponseEntity<Response> isepDelete(@PathVariable Long id) throws InterruptedException {
        return ResponseEntity.ok(
                Response
                        .builder()
                        .timestamp(Instant.now().getEpochSecond())
                        .data(Map.of("items", todoService.delete(id)))
                        .message("Suppression de la tâche avec succès")
                        .status(OK)
                        .statusCode(OK.value())
                        .build()
        );
    }

}
