import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Typography, Box, Chip, IconButton, Collapse, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FlipIcon from '@mui/icons-material/Flip';

function FlashcardItem({ row, index }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const MAX_PREVIEW_LENGTH = 200;
  const frontText = row[0];
  const backText = row[1];
  const needsExpand = frontText.length > MAX_PREVIEW_LENGTH || backText.length > MAX_PREVIEW_LENGTH;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      elevation={2}
      sx={{
        width: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)',
        },
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Chip
            label={`Card ${index + 1}`}
            color="primary"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
          <IconButton size="small" onClick={handleFlip} color="primary">
            <FlipIcon />
          </IconButton>
        </Stack>

        <Box
          sx={{
            perspective: '1000px',
            minHeight: '100px',
          }}
        >
          <Box
            sx={{
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {!isFlipped ? (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  Translated
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    bgcolor: 'primary.light',
                    borderRadius: 2,
                    borderLeft: 4,
                    borderColor: 'primary.main',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
                    {isExpanded || frontText.length <= MAX_PREVIEW_LENGTH
                      ? frontText
                      : `${frontText.substring(0, MAX_PREVIEW_LENGTH)}...`}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ transform: 'rotateY(180deg)' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'secondary.main',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  Original
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                    p: 2,
                    bgcolor: 'secondary.light',
                    borderRadius: 2,
                    borderLeft: 4,
                    borderColor: 'secondary.main',
                  }}
                >
                  <Typography variant="body2" sx={{ color: 'secondary.contrastText' }}>
                    {isExpanded || backText.length <= MAX_PREVIEW_LENGTH
                      ? backText
                      : `${backText.substring(0, MAX_PREVIEW_LENGTH)}...`}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>

        {needsExpand && (
          <Stack direction="row" justifyContent="center" mt={1}>
            <IconButton size="small" onClick={() => setIsExpanded(!isExpanded)} color="primary">
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export default function CurrentStack({ rows }) {
  return (
    <Stack
      className="CURRENT_STACK"
      gap={3}
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
      }}
    >
      {rows.length === 0 ? (
        <Stack
          gap={2}
          alignItems="center"
          justifyContent="center"
          sx={{ width: '100%', height: '100%', color: 'text.secondary' }}
        >
          <Typography variant="h6" color="text.secondary">
            No flashcards yet
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Upload an image and add flashcards to see them here
          </Typography>
        </Stack>
      ) : (
        rows.map((row, index) => <FlashcardItem key={index} row={row} index={index} />)
      )}
    </Stack>
  );
}