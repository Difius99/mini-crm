import { useState } from "react";
import Button from "../../../components/ui/button/Button";
import Modal from "../../../components/ui/modal/Modal";
import { Textarea } from "../../../components/ui/textarea/Textarea";
import { Actions, ErrorText, Muted } from "../../../styled";
import { changeTaskStatus } from "../../../api/tasks.api";
import { getApiErrorMessage } from "../../../api/errors";
import { useAuth } from "../../auth/AuthContext";
import { getAvailableTransitions, type Transition } from "../statusFlow";
import type { TaskActionsProps } from "./types";

export default function TaskActions({ task, onChanged }: TaskActionsProps) {
  const { profile } = useAuth();
  const [pending, setPending] = useState<Transition | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [commentFor, setCommentFor] = useState<Transition | null>(null);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  if (!profile) return null;

  const transitions = getAvailableTransitions({
    status: task.status,
    role: profile.role,
    isAssignee: task.assignee_id === profile.id,
  });

  const run = async (transition: Transition, text?: string) => {
    setPending(transition);
    setError(null);
    try {
      await changeTaskStatus(task.id, transition.to, text);
      setCommentFor(null);
      setComment("");
      onChanged();
    } catch (e) {
      const message = getApiErrorMessage(e);
      if (commentFor) setCommentError(message);
      else setError(message);
    } finally {
      setPending(null);
    }
  };

  const handleClick = (transition: Transition) => {
    if (transition.needsComment) {
      setCommentFor(transition);
      setComment("");
      setCommentError(null);
      return;
    }
    void run(transition);
  };

  const submitComment = () => {
    if (!commentFor) return;
    if (!comment.trim()) {
      setCommentError("Комментарий обязателен");
      return;
    }
    void run(commentFor, comment.trim());
  };

  if (transitions.length === 0) {
    return <Muted>Для вас в этом статусе действий нет</Muted>;
  }

  return (
    <>
      <Actions>
        {transitions.map((t) => (
          <Button
            key={`${t.from}-${t.to}`}
            variant={t.needsComment ? "danger" : "primary"}
            isLoading={pending === t}
            disabled={pending !== null}
            onClick={() => handleClick(t)}
          >
            {t.label}
          </Button>
        ))}
      </Actions>
      {error && <ErrorText>{error}</ErrorText>}

      <Modal
        isOpen={!!commentFor}
        onClose={() => !pending && setCommentFor(null)}
        title="Вернуть на доработку"
      >
        <Textarea
          label="Что нужно исправить"
          placeholder="Опишите замечания для исполнителя"
          value={comment}
          autoFocus
          status={commentError ? "error" : "default"}
          helperText={commentError ?? undefined}
          isValidate
          onChange={(e) => {
            setComment(e.target.value);
            if (commentError) setCommentError(null);
          }}
        />
        <Actions>
          <Button
            variant="danger"
            isLoading={!!pending}
            onClick={submitComment}
          >
            Вернуть
          </Button>
          <Button
            variant="secondary"
            disabled={!!pending}
            onClick={() => setCommentFor(null)}
          >
            Отмена
          </Button>
        </Actions>
      </Modal>
    </>
  );
}
