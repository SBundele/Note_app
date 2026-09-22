from rest_framework import status
from rest_framework.test import APITestCase

from .models import Note


class NoteApiTests(APITestCase):
	def setUp(self):
		self.note = Note.objects.create(
			title="First note",
			body="Note body",
			category="PERSONAL",
		)

	def test_list_notes_returns_notes(self):
		response = self.client.get("/notes")

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(len(response.data), 1)
		self.assertEqual(response.data[0]["title"], "First note")

	def test_create_note_generates_slug(self):
		response = self.client.post(
			"/notes",
			{"title": "Second note", "body": "New body", "category": "BUSINESS"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.data["slug"], "second-note")

	def test_update_note_changes_editable_fields(self):
		response = self.client.put(
			f"/notes/{self.note.slug}",
			{
				"title": "Updated note",
				"body": "Updated body",
				"category": "IMPORTANT",
			},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.note.refresh_from_db()
		self.assertEqual(self.note.title, "Updated note")
		self.assertEqual(self.note.category, "IMPORTANT")

	def test_delete_note_removes_note(self):
		response = self.client.delete(f"/notes/{self.note.slug}")

		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
		self.assertFalse(Note.objects.filter(pk=self.note.pk).exists())

	def test_missing_note_returns_not_found(self):
		response = self.client.get("/notes/missing-note")

		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
