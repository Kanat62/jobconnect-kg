import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  destructive = false,
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={destructive ? undefined : onClose}>
      <DialogContent
        className="rounded-2xl max-w-sm"
        onPointerDownOutside={destructive ? (e) => e.preventDefault() : undefined}
        onEscapeKeyDown={destructive ? (e) => e.preventDefault() : undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="ghost" onClick={onClose} className="rounded-xl">{cancelText}</Button>
          <Button
            onClick={() => { onConfirm(); onClose(); }}
            className={`rounded-xl ${destructive ? "bg-[#B42020] hover:bg-[#9a1b1b] text-white" : ""}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
