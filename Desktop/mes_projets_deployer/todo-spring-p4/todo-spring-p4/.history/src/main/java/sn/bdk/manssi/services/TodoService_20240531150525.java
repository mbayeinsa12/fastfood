
package sn.bdk.manssi.services;

import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.NoSuchElementException;

import sn.bdk.manssi.models.Todo;

public interface TodoService {
    Todo create(Todo ossec) throws UnsupportedEncodingException;

    Collection<Todo> list();
    Boolean delete(Long id);

}
