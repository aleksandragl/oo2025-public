package ee.gluhhova.sonade_loputahed.Exception;

import lombok.Data;
import java.util.Date;

@Data
public class ErrorMessage {
    private String message;
    private Date timestamp;
    private int status;
}
