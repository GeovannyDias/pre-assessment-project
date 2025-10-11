-- ============================
-- Trigger: TRG_BEC_TRANSACTION_BEFORE_INSERT
-- ============================

DELIMITER $$

CREATE TRIGGER TRG_BEC_TRANSACTION_BEFORE_INSERT
BEFORE INSERT ON BDD_BANCO_EC.BEC_TRANSACTION
FOR EACH ROW
BEGIN
  DECLARE V_BALANCE DECIMAL(18,2);

  -- Obtener el saldo actual de la cuenta
  SELECT BALANCE INTO V_BALANCE
  FROM BDD_BANCO_EC.BEC_ACCOUNT
  WHERE ID_ACCOUNT = NEW.ACCOUNT_ID
  FOR UPDATE;

  -- Validar el tipo de transacción y actualizar el saldo
  IF NEW.TYPE = 'CREDIT' THEN
    SET NEW.BALANCE_BEFORE = V_BALANCE;
    SET NEW.BALANCE_AFTER = V_BALANCE + NEW.AMOUNT;

    -- Actualizar saldo en la tabla BEC_ACCOUNT
    UPDATE BDD_BANCO_EC.BEC_ACCOUNT
    SET BALANCE = BALANCE + NEW.AMOUNT
    WHERE ID_ACCOUNT = NEW.ACCOUNT_ID;

  ELSEIF NEW.TYPE = 'DEBIT' THEN
    -- Validar que haya suficiente saldo
    IF V_BALANCE < NEW.AMOUNT THEN
      SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Fondos insuficientes para la transacción';
    END IF;

    SET NEW.BALANCE_BEFORE = V_BALANCE;
    SET NEW.BALANCE_AFTER = V_BALANCE - NEW.AMOUNT;

    -- Actualizar saldo en la tabla BEC_ACCOUNT
    UPDATE BDD_BANCO_EC.BEC_ACCOUNT
    SET BALANCE = BALANCE - NEW.AMOUNT
    WHERE ID_ACCOUNT = NEW.ACCOUNT_ID;
  END IF;
END$$

DELIMITER ;


-- SHOW TRIGGERS LIKE 'BEC_TRANSACTION';

/*
Opción 1: Ejecutar todo el trigger de una sola vez SIN DELIMITER

Quita DELIMITER y usa punto y coma (;) normalmente, pero selecciona todo el bloque del trigger completo antes de ejecutar.

Instrucciones:
Selecciona todo el bloque desde CREATE TRIGGER ... hasta END;. (No olvidar el ";")
Haz clic derecho > Execute SQL Statement (Ctrl+Enter o botón de rayo).
Revisa si el trigger aparece ahora en la carpeta Triggers de la tabla BEC_TRANSACTION.

Opción 2: Activar modo de ejecución como script en DBeaver

Esto permite que DELIMITER funcione, pero solo si lo configuras.

En DBeaver, ve a la pestaña del script.
Haz clic en la flechita al lado de ejecutar (el rayo).
Elige: Execute SQL Script (o usa Alt+X).
Ejecuta tu script original con DELIMITER $$ y END$$.
Esto le dice a DBeaver que lo que estás ejecutando es un bloque completo, no solo línea por línea.

*/



