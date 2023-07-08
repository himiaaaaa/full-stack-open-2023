import { Alert, Dialog, DialogTitle, DialogContent, Divider } from '@mui/material';

import AddEntryForm from './AddEntryForm';
import { EntryWithoutId } from "../../types";

interface Props {
  modalOpen: boolean;
  onSubmit: (values: EntryWithoutId) => void;
  onClose: () => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onSubmit, error, onClose }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
  <DialogTitle>Add a new Entry</DialogTitle>
  <Divider />
  <DialogContent>
    {error && <Alert severity="error">{error}</Alert>}
    <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
  </DialogContent>
  </Dialog>
);

export default AddEntryModal;