import {OfflineGameService} from '..';

let initMockRecordCache = uid => ({
  gameRecords: {
    [uid]: {
      challenge: {wpm: 50, accuracy: 50, level: 5},
      spacerace: {wpm: 50, accuracy: 50, level: 5},
      rst: {wpm: 50, accuracy: 50, level: 5}
    }
  }
});

describe('Get High Scores', () => {
  const _getFromLocalStorageMock = jest.fn();
  test('Returns top scores for Challenge', () => {
    _getFromLocalStorageMock.mockReturnValueOnce({
      gameRecords: {
        someuid: {
          challenge: {
            wpm: 10,
            accuracy: 10,
            level: 10
          }
        }
      }
    }); 
    const server = new OfflineGameService(_getFromLocalStorageMock);
    const gameRecords = server._getRecords('someuid', 'challenge');
    expect(gameRecords).toEqual({ wpm: 10, accuracy: 10, level: 10 });
  });

  test('Returns top scores for SpaceRace', () => {
    _getFromLocalStorageMock.mockReturnValueOnce({
      gameRecords: {
        someuid: {
          spacerace: {
            wpm: 10,
            accuracy: 10,
            level: 10
          }
        }
      }
    });
    const server = new OfflineGameService(_getFromLocalStorageMock);
    const gameRecords = server._getRecords('someuid', 'spacerace');
    expect(gameRecords).toEqual({ wpm: 10, accuracy: 10, level: 10 });
  });

  test('Returns top scores for RST', () => {
    _getFromLocalStorageMock.mockReturnValueOnce(
      {
        gameRecords: {
          someuid: {
            spacerace: {
              wpm: 10,
              accuracy: 10,
              level: 10
            }
          }
        }
      }
    );
    const server = new OfflineGameService(_getFromLocalStorageMock);
    const gameRecords = server._getRecords('someuid', 'spacerace');
    expect(gameRecords).toEqual({ wpm: 10, accuracy: 10, level: 10 });
  });

  test('Get HighScores', async () => {
    _getFromLocalStorageMock.mockReturnValueOnce({
      gameRecords: {
        someuid: {
          spacerace: {
            wpm: 10,
            accuracy: 10,
            level: 10
          }
        }
      }
    });
    const server = new OfflineGameService(_getFromLocalStorageMock);
    const gameRecords = await server.getHighScores('someuid', 'spacerace');
    const expected = { wpm: 10, accuracy: 10, level: 10 };
    expect(gameRecords).toEqual(expected);
  });
})

describe('Compare High Scores And Update', () => {
  test('High scores were beat, should change high scores', () => {
    const server = new OfflineGameService();

    let highScores = {wpm: 50, accuracy: 50, level: 50};
    const newScores = {wpm: 51, accuracy: 51, level:51};
    server._compareHighScoresAndUpdate(highScores, newScores);

    expect(highScores).toEqual(newScores);
  });

  test('High scores were not beat, should not change', () => {
    const service = new OfflineGameService();

    let highScores = {wpm: 50, accuracy: 50, level: 50};
    const expected = highScores;
    const scores = {wpm: 49, accuracy: 49, level: 49};
    service._compareHighScoresAndUpdate(highScores, scores);
    
    expect(highScores).toEqual(expected);
  });
});

describe('Add Game Score', () => {
  const testUID = '12';
  let mockCache = initMockRecordCache(testUID);

  const _getFromLocalStorageMock = jest
    .fn()
    .mockReturnValue(mockCache);

  const _setToLocalStorageMock = jest
    .fn()
    .mockImplementation((key, newRecords) => {
      mockCache = newRecords;
    });

  beforeEach(() => {
    mockCache = initMockRecordCache(testUID);
  });
  
  test('Save game scores', () => {
    const service = new OfflineGameService(
      _getFromLocalStorageMock, 
      _setToLocalStorageMock
    );
    const expected = {wpm: 51, accuracy: 51, level: 6};
    service._saveGameScores(testUID, 'spacerace', expected);
    expect(mockCache.gameRecords[testUID].spacerace).toEqual(expected);
  });

  test('it does not update game score if lower than high score', async () => {
    const testUID = '12';
    const expectedScore = {wpm: 51, accuracy: 51, level: 10};
    const service = new OfflineGameService(
      _getFromLocalStorageMock,
      _setToLocalStorageMock
    );
    await service.addGameScoreAndUpdateIfHigher(testUID, 'spacerace', expectedScore);
    expect(mockCache.gameRecords[testUID].spacerace).toEqual(expectedScore);
  });
});