import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'cubit/quiz_cubit.dart';

class QuestionCard extends StatelessWidget {
  final int qIndex;

  const QuestionCard({
    Key? key,
    required this.qIndex,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => BlocBuilder<QuizCubit, QuizState>(
        // TODO Add buildWhen
        builder: (context, state) {
          final theme = Theme.of(context);
          final question = state.questions[qIndex];

          return Center(
            child: Container(
              constraints: const BoxConstraints(maxWidth: 800),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${question.id}'.padLeft(3, '0'),
                        style: theme.textTheme.bodySmall,
                      ),
                      Text(
                        '${qIndex + 1}. ${question.question}',
                        style: theme.textTheme.titleLarge,
                      ),
                      const SizedBox(height: 10),
                      if (question.image != null)
                        Center(
                          child: Container(
                            constraints: const BoxConstraints(
                              maxHeight: 500,
                              maxWidth: 500,
                            ),
                            padding: const EdgeInsets.only(bottom: 10),
                            child: question.answers != null
                                ? Image.asset('images/${question.image}')
                                : HiddenImage(
                                    img: question.image!,
                                    isHidden: state.revealed![qIndex] == null,
                                    onClick: () => context
                                        .read<QuizCubit>()
                                        .answer(qIndex, 1),
                                  ),
                          ),
                        ),
                      if (question.answers != null)
                        Card(
                          clipBehavior: Clip.antiAlias,
                          elevation: 0,
                          shape:
                              (theme.cardTheme.shape as RoundedRectangleBorder?)
                                  ?.copyWith(
                            side: BorderSide(color: Colors.grey.shade300),
                          ),
                          child: ListView.separated(
                            shrinkWrap: true,
                            itemCount: question.answers!.length,
                            itemBuilder: (_, aIndex) {
                              final revealed = state.revealed![qIndex] ?? {};

                              return AnswerTile(
                                text: question.answers![aIndex],
                                isCorrect: aIndex == question.correct,
                                isRevealed: revealed.contains(aIndex),
                                isEnabled: !revealed.contains(question.correct),
                                onClick: () => context
                                    .read<QuizCubit>()
                                    .answer(qIndex, aIndex),
                              );
                            },
                            separatorBuilder: (_, __) =>
                                const Divider(height: 0),
                          ),
                        )
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      );
}

class HiddenImage extends StatelessWidget {
  final String img;
  final bool isHidden;
  final void Function()? onClick;

  const HiddenImage({
    Key? key,
    required this.img,
    this.isHidden = true,
    this.onClick,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return FramedWidget(
      child: Stack(
        children: [
          Image.asset('images/$img'),
          if (isHidden)
            Positioned.fill(
              child: Material(
                color: Color.alphaBlend(
                  theme.colorScheme.primary.withAlpha(20),
                  theme.colorScheme.surface,
                ),
                child: InkWell(
                  onTap: onClick,
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(30),
                      child: Text(
                        'Razkrij odgovor',
                        style: theme.textTheme.titleMedium,
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class FramedWidget extends StatelessWidget {
  final Widget? child;

  const FramedWidget({
    Key? key,
    this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      elevation: 0,
      shape: (theme.cardTheme.shape as RoundedRectangleBorder?)?.copyWith(
        side: BorderSide(color: theme.colorScheme.primary),
      ),
      clipBehavior: Clip.hardEdge,
      child: child,
    );
  }
}

class AnswerTile extends StatelessWidget {
  final String text;
  final bool isCorrect;
  final void Function()? onClick;
  final bool isRevealed;
  final bool isEnabled;
  final bool isSelected;

  const AnswerTile({
    Key? key,
    required this.text,
    required this.isCorrect,
    this.onClick,
    this.isRevealed = false,
    this.isEnabled = true,
    this.isSelected = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) => ListTile(
        onTap: !isRevealed && isEnabled ? onClick : null,
        title: Text(text),
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 2),
        tileColor: isRevealed
            ? (isCorrect ? Colors.green.shade200 : Colors.red.shade100)
            : null,
      );
}