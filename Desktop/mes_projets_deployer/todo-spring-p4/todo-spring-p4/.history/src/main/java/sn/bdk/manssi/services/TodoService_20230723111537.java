
package sn.bdk.manssi.service;

import sn.bdk.manssi.model.Todo;

import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.NoSuchElementException;

public interface TodoService {
    Todo create(Todo ossec) throws UnsupportedEncodingException;

    Collection<Todo> list();
    Boolean delete(Long id);

}
