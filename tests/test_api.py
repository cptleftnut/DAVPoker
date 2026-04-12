import unittest

from fastapi.testclient import TestClient

from app.main import ai_engine, app


class DAVPokerAPITest(unittest.TestCase):
    def setUp(self):
        ai_engine.history.clear()
        ai_engine.opponents.clear()
        self.client = TestClient(app)

    def test_health(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    def test_ingest_high_pair_raises(self):
        payload = {
            'player_id': 'p1',
            'parsed_state': {'current_hand': [['A', 's'], ['A', 'h']], 'pot_size': 100},
        }
        response = self.client.post('/api/v1/scraper/ingest', json=payload)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body['action'], 'RAISE')
        self.assertEqual(body['raise_amount'], 50.0)
        self.assertFalse(body['is_bluff'])

    def test_ingest_handles_invalid_pot_size(self):
        payload = {
            'player_id': 'p1',
            'parsed_state': {'current_hand': [], 'pot_size': 'not-a-number'},
        }
        response = self.client.post('/api/v1/scraper/ingest', json=payload)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertIn('action', body)
        self.assertIn('raise_amount', body)

    def test_outcome_rejects_invalid_reaction(self):
        response = self.client.post('/api/v1/scraper/outcome', json={'player_id': 'p1', 'reaction': 'check'})
        self.assertEqual(response.status_code, 400)

    def test_outcome_updates_profile_for_pending_bluff(self):
        ai_engine.history.append({
            'action': 'RAISE',
            'raise_amount': 15.0,
            'is_bluff': True,
            'player_target': 'p1',
            'latency_ms': 8,
        })

        response = self.client.post('/api/v1/scraper/outcome', json={'player_id': 'p1', 'reaction': 'CALL'})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body['player_id'], 'p1')
        self.assertEqual(body['calls'], 1)
        self.assertEqual(body['folds'], 0)
        self.assertEqual(body['total_bluffs_faced'], 1)


if __name__ == '__main__':
    unittest.main()
